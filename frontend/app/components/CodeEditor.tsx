'use client';

import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  language?: string;
}

export default function CodeEditor({ code, onChange, language = 'javascript' }: CodeEditorProps) {
  return (
    <div className="h-full w-full rounded-xl overflow-hidden border border-white/10 glass">
      <Editor
        height="100%"
        defaultLanguage={language}
        theme="vs-dark"
        value={code}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          padding: { top: 20 },
          smoothScrolling: true,
          cursorSmoothCaretAnimation: "on",
          lineNumbersMinChars: 3,
          backgroundColor: '#0a0a0a',
        }}
      />
    </div>
  );
}
