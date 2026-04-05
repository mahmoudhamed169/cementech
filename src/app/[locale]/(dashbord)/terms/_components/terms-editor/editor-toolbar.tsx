"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Minus,
} from "lucide-react";

interface EditorToolbarProps {
  editor: Editor | null;
}

type ToolbarButton = {
  icon: React.ReactNode;
  action: () => void;
  isActive?: boolean;
  title: string;
};

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

  const groups: ToolbarButton[][] = [
    // History
    [
      {
        icon: <Undo size={15} />,
        action: () => editor.chain().focus().undo().run(),
        title: "Undo",
      },
      {
        icon: <Redo size={15} />,
        action: () => editor.chain().focus().redo().run(),
        title: "Redo",
      },
    ],
    // Headings
    [
      {
        icon: <Heading1 size={15} />,
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: editor.isActive("heading", { level: 1 }),
        title: "Heading 1",
      },
      {
        icon: <Heading2 size={15} />,
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: editor.isActive("heading", { level: 2 }),
        title: "Heading 2",
      },
      {
        icon: <Heading3 size={15} />,
        action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: editor.isActive("heading", { level: 3 }),
        title: "Heading 3",
      },
    ],
    // Formatting
    [
      {
        icon: <Bold size={15} />,
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: editor.isActive("bold"),
        title: "Bold",
      },
      {
        icon: <Italic size={15} />,
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: editor.isActive("italic"),
        title: "Italic",
      },
      {
        icon: <Strikethrough size={15} />,
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: editor.isActive("strike"),
        title: "Strike",
      },
    ],
    // Lists
    [
      {
        icon: <List size={15} />,
        action: () => editor.chain().focus().toggleBulletList().run(),
        isActive: editor.isActive("bulletList"),
        title: "Bullet List",
      },
      {
        icon: <ListOrdered size={15} />,
        action: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: editor.isActive("orderedList"),
        title: "Ordered List",
      },
    ],
    // Alignment
    [
      {
        icon: <AlignLeft size={15} />,
        action: () => editor.chain().focus().setTextAlign("left").run(),
        isActive: editor.isActive({ textAlign: "left" }),
        title: "Align Left",
      },
      {
        icon: <AlignCenter size={15} />,
        action: () => editor.chain().focus().setTextAlign("center").run(),
        isActive: editor.isActive({ textAlign: "center" }),
        title: "Align Center",
      },
      {
        icon: <AlignRight size={15} />,
        action: () => editor.chain().focus().setTextAlign("right").run(),
        isActive: editor.isActive({ textAlign: "right" }),
        title: "Align Right",
      },
      {
        icon: <AlignJustify size={15} />,
        action: () => editor.chain().focus().setTextAlign("justify").run(),
        isActive: editor.isActive({ textAlign: "justify" }),
        title: "Justify",
      },
    ],
    // Divider
    [
      {
        icon: <Minus size={15} />,
        action: () => editor.chain().focus().setHorizontalRule().run(),
        title: "Horizontal Rule",
      },
    ],
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 px-3 py-2 bg-gray-50">
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className="flex items-center gap-0.5">
          {groupIndex !== 0 && <div className="w-px h-5 bg-gray-300 mx-1" />}
          {group.map((btn, btnIndex) => (
            <button
              key={btnIndex}
              type="button"
              title={btn.title}
              onClick={btn.action}
              className={`p-1.5 rounded-md transition-all ${
                btn.isActive
                  ? "bg-[#155DFC] text-white"
                  : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              {btn.icon}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
