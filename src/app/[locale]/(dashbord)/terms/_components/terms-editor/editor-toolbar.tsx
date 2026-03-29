"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Search,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface EditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  const t = useTranslations("termsPage.editor");
  const [search, setSearch] = useState("");

  if (!editor) return null;

  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-3 py-1.5 bg-gray-50 gap-3">
      {/* Formatting Buttons */}
      <div className="flex items-center gap-0.5">
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          className="h-8 w-8 data-[state=on]:bg-[#155DFC]/10 data-[state=on]:text-[#155DFC]"
        >
          <Bold className="w-3.5 h-3.5" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          className="h-8 w-8 data-[state=on]:bg-[#155DFC]/10 data-[state=on]:text-[#155DFC]"
        >
          <Italic className="w-3.5 h-3.5" />
        </Toggle>

        <div className="w-px h-4 bg-gray-300 mx-1.5" />

        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "left" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
          className="h-8 w-8 data-[state=on]:bg-[#155DFC]/10 data-[state=on]:text-[#155DFC]"
        >
          <AlignLeft className="w-3.5 h-3.5" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "center" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
          className="h-8 w-8 data-[state=on]:bg-[#155DFC]/10 data-[state=on]:text-[#155DFC]"
        >
          <AlignCenter className="w-3.5 h-3.5" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "right" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
          className="h-8 w-8 data-[state=on]:bg-[#155DFC]/10 data-[state=on]:text-[#155DFC]"
        >
          <AlignRight className="w-3.5 h-3.5" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "justify" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("justify").run()
          }
          className="h-8 w-8 data-[state=on]:bg-[#155DFC]/10 data-[state=on]:text-[#155DFC]"
        >
          <AlignJustify className="w-3.5 h-3.5" />
        </Toggle>
      </div>

      {/* Search */}
      <div className="relative w-44">
        <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("search")}
          className="h-8 pr-8 text-xs text-right border-gray-200 bg-white focus-visible:ring-[#155DFC]/30"
        />
      </div>
    </div>
  );
}
