import { NextRequest, NextResponse } from 'next/server';
import { getAgentPrompt, renderPrompt } from '@/data/agent-prompts';
import { toolRegistry, executeTool } from '@/lib/neural/tools';

export async function POST(request: NextRequest) {
  try {
    const { agentId, context, stream = false, overrides } = await request.json();

    // Find agent prompt template (now with fallback)
    const baseTemplate = getAgentPrompt(agentId);
    
    // Apply graphical overrides if present
    const template = {
      ...baseTemplate,
      ...(overrides || {})
    };

    // Render prompt with context
    const userPrompt = renderPrompt(template, context);

    // Get API key from environment
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'No LLM API key configured. Set ANTHROPIC_API_KEY in environment.' },
        { status: 500 }
      );
    }

    // Determine provider based on available key
    let provider = 'openai';
    if (process.env.ANTHROPIC_API_KEY) provider = 'anthropic';
    else if (process.env.GEMINI_API_KEY) provider = 'gemini';

    // ... (Gemini implementation remains same but could be updated later) ...

    // Execute via Anthropic API with Tool Support
    if (provider === 'anthropic') {
      let messages = [
        { role: 'user', content: userPrompt }
      ];

      // Initial Call with Tools
      let resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey!,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: template.maxTokens,
          system: template.systemPrompt,
          tools: toolRegistry,
          messages,
          temperature: template.temperature,
        })
      });

      if (!resp.ok) {
        const error = await resp.text();
        return NextResponse.json({ error: `Anthropic API error: ${error}` }, { status: resp.status });
      }

      let data = await resp.json();
      
      // TOOL USE LOOP
      // If Claude wants to use a tool, execute it and call back
      if (data.stop_reason === 'tool_use') {
        const toolResults = [];
        
        for (const content of data.content) {
          if (content.type === 'tool_use') {
            const result = await executeTool(content.name, content.input);
            toolResults.push({
              type: 'tool_result',
              tool_use_id: content.id,
              content: JSON.stringify(result)
            });
          }
        }

        // Second Call with Tool Results
        messages.push({ role: 'assistant', content: data.content });
        messages.push({ role: 'user', content: toolResults as any });

        resp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey!,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-5',
            max_tokens: template.maxTokens,
            system: template.systemPrompt,
            tools: toolRegistry,
            messages,
            temperature: template.temperature,
          })
        });

        if (!resp.ok) {
          const error = await resp.text();
          return NextResponse.json({ error: `Anthropic API error (tool loop): ${error}` }, { status: resp.status });
        }

        data = await resp.json();
      }

      const output = data.content?.[0]?.text || '';

      return NextResponse.json({
        success: true,
        agentId,
        output,
        provider: 'anthropic',
        tokensUsed: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
        outputFormat: template.outputFormat,
        toolCalls: messages.filter(m => m.role === 'assistant' && Array.isArray(m.content) && m.content.some((c: any) => c.type === 'tool_use'))
      });
    }

    // Execute via OpenAI API
    if (provider === 'openai') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: template.systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: template.temperature,
          max_tokens: template.maxTokens
        })
      });

      if (!response.ok) {
        const error = await response.text();
        return NextResponse.json(
          { error: `OpenAI API error: ${error}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      const output = data.choices?.[0]?.message?.content || '';

      return NextResponse.json({
        success: true,
        agentId,
        output,
        provider: 'openai',
        tokensUsed: data.usage?.total_tokens || 0,
        outputFormat: template.outputFormat
      });
    }

    return NextResponse.json(
      { error: 'Invalid provider configuration' },
      { status: 500 }
    );

  } catch (error: any) {
    console.error('Neural Gateway error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
