"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import EditorToolbar from "./editor-toolbar";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

interface TermsEditorProps {
  content: string;
  onChange: (content: string) => void;
  dir?: "rtl" | "ltr";
}

export default function TermsEditor({
  content,
  onChange,
  dir = "rtl",
}: TermsEditorProps) {
  const t = useTranslations("termsPage.editor");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: t("placeholder"),
      }),
    ],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `min-h-[350px] p-4 focus:outline-none prose prose-sm max-w-none bg-white`,
        dir,
      },
    },
  });

  // مزامنة المحتوى عند تغيير اللغة أو الفئة
  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  // تحديث اتجاه النص عند تغيير dir
  useEffect(() => {
    if (editor) {
      editor.view.dom.setAttribute("dir", dir);
    }
  }, [dir, editor]);

  const wordCount =
    editor?.getText().trim().split(/\s+/).filter(Boolean).length ?? 0;
  const charCount = editor?.getText().length ?? 0;

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm bg-white">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-2 bg-gray-50 text-xs text-muted-foreground">
        <span className="font-medium">{t("editorLabel")}</span>
        <span>
          {t("wordCount", { count: wordCount })} |{" "}
          {t("charCount", { count: charCount })}
        </span>
      </div>
    </div>
  );
}
