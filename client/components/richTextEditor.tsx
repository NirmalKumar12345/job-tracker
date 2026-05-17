'use client';

import { useEffect, useRef, useState } from 'react';
import { useEditor, useEditorState, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Code2,
  Minus,
  CaseLower,
  CaseUpper,
  RemoveFormatting,
  Printer,
  Maximize2,
  Minimize2,
  Undo2,
  Redo2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      // Prevent the editor from losing focus / selection on mousedown.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        'h-8 w-8 inline-flex items-center justify-center rounded text-sm transition-colors cursor-pointer',
        'hover:bg-black hover:text-white disabled:opacity-40 disabled:cursor-not-allowed',
        active && 'bg-black text-white hover:bg-black',
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-6 w-px bg-border" />;
}

function Toolbar({
  editor,
  fullscreen,
  onToggleFullscreen,
  onPrint,
}: {
  editor: Editor;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
  onPrint: () => void;
}) {
  // Subscribe to editor state so toolbar buttons re-render on every
  // selection / transaction — without this, isActive() reads stale state
  // when the user selects existing text and clicks a format button.
  const state = useEditorState({
    editor,
    selector: ({ editor: ed }) => {
      if (!ed) return null;
      return {
        isBold: ed.isActive('bold'),
        isItalic: ed.isActive('italic'),
        isUnderline: ed.isActive('underline'),
        isStrike: ed.isActive('strike'),
        isH1: ed.isActive('heading', { level: 1 }),
        isH2: ed.isActive('heading', { level: 2 }),
        isH3: ed.isActive('heading', { level: 3 }),
        isBulletList: ed.isActive('bulletList'),
        isOrderedList: ed.isActive('orderedList'),
        isBlockquote: ed.isActive('blockquote'),
        isCode: ed.isActive('code'),
        isCodeBlock: ed.isActive('codeBlock'),
        canUndo: ed.can().undo(),
        canRedo: ed.can().redo(),
      };
    },
  });

  const transformSelection = (fn: (s: string) => string) => {
    const { from, to, empty } = editor.state.selection;
    if (empty) return;
    const text = editor.state.doc.textBetween(from, to, ' ');
    editor.chain().focus().insertContentAt({ from, to }, fn(text)).run();
  };

  if (!state) return null;

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b bg-muted/30 p-1">
      <ToolbarButton
        title="Bold"
        active={state.isBold}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        title="Italic"
        active={state.isItalic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        title="Underline"
        active={state.isUnderline}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        title="Strikethrough"
        active={state.isStrike}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        title="Lowercase"
        onClick={() => transformSelection((s) => s.toLowerCase())}
      >
        <CaseLower className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        title="Uppercase"
        onClick={() => transformSelection((s) => s.toUpperCase())}
      >
        <CaseUpper className="h-4 w-4" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        title="Heading 1"
        active={state.isH1}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        title="Heading 2"
        active={state.isH2}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        title="Heading 3"
        active={state.isH3}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="h-4 w-4" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        title="Bullet List"
        active={state.isBulletList}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        title="Ordered List"
        active={state.isOrderedList}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        title="Quote"
        active={state.isBlockquote}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        title="Inline Code"
        active={state.isCode}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        title="Code Block"
        active={state.isCodeBlock}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code2 className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        title="Horizontal Rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus className="h-4 w-4" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        title="Clear Formatting"
        onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
      >
        <RemoveFormatting className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton title="Print" onClick={onPrint}>
        <Printer className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        onClick={onToggleFullscreen}
      >
        {fullscreen ? (
          <Minimize2 className="h-4 w-4" />
        ) : (
          <Maximize2 className="h-4 w-4" />
        )}
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        title="Undo"
        disabled={!state.canUndo}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        title="Redo"
        disabled={!state.canRedo}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
}

export default function RichTextEditor({ value, onChange }: Props) {
  const [fullscreen, setFullscreen] = useState(false);
  // Tracks the last HTML the editor itself emitted, so we can ignore echoes
  // from the parent (which would otherwise reset selection on every keystroke).
  const lastEmitted = useRef<string>(value || '');

  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none min-h-[200px] p-3 focus:outline-none dark:prose-invert',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      lastEmitted.current = html;
      onChange(html);
    },
  });

  // Only re-set content when an EXTERNAL change comes in (parent reset the
  // value, edit mode loaded data, etc.) — not when the new value is just our
  // own emission echoing back.
  useEffect(() => {
    if (!editor) return;
    const incoming = value || '';
    if (incoming === lastEmitted.current) return;
    if (incoming === editor.getHTML()) return;
    lastEmitted.current = incoming;
    editor.commands.setContent(incoming, { emitUpdate: false });
  }, [value, editor]);

  // Lock body scroll while in fullscreen.
  useEffect(() => {
    if (!fullscreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [fullscreen]);

  const printContent = () => {
    if (!editor) return;
    const html = editor.getHTML();
    const doc = `<!doctype html><html><head><title>Print</title>
      <style>body{font-family:system-ui,sans-serif;padding:24px;line-height:1.5;}
      h1,h2,h3{margin:0.5em 0}pre{background:#f4f4f4;padding:8px;border-radius:4px}
      blockquote{border-left:3px solid #ddd;padding-left:12px;color:#555}</style>
      </head><body>${html}</body></html>`;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.srcdoc = doc;
    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => iframe.remove(), 500);
    };
    document.body.appendChild(iframe);
  };

  if (!editor) return null;

  return (
    <div
      className={cn(
        'rounded-md border bg-background flex flex-col',
        fullscreen && 'fixed inset-0 z-50 rounded-none',
      )}
    >
      <Toolbar
        editor={editor}
        fullscreen={fullscreen}
        onToggleFullscreen={() => setFullscreen((f) => !f)}
        onPrint={printContent}
      />
      <EditorContent
        editor={editor}
        className={cn(
          'flex-1 min-h-0',
          fullscreen ? 'overflow-y-auto' : 'overflow-y-auto max-h-[60vh]',
        )}
      />
    </div>
  );
}
