"use client";

import { useRef, useState } from "react";
import {
  Image,
  Plus,
  Trash2,
  Upload,
  Loader2,
  X,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useAds } from "../../../_hooks/ads/use-ads";
import { useAddAd } from "../../../_hooks/ads/use-add-ad";
import { useDeleteAd } from "../../../_hooks/ads/use-delete-ad";
import { useTranslations } from "next-intl";
import { Ad } from "@/src/lib/types/ads";

export default function BannersTab() {
  const t = useTranslations("settingsPage.tabs.banners");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmAd, setConfirmAd] = useState<Ad | null>(null);
  const [previewAd, setPreviewAd] = useState<Ad | null>(null);

  const { data, isLoading } = useAds();
  const { mutate: addAd, isPending: isAdding } = useAddAd();
  const { mutate: deleteAd, isPending: isConfirmDeleting } = useDeleteAd();

  const ads = data?.data ?? [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    addAd(formData);
    e.target.value = "";
  };

  const handleDropZoneClick = () => fileInputRef.current?.click();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    addAd(formData);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleConfirmDelete = () => {
    if (!confirmAd) return;
    setDeletingId(confirmAd.id);
    deleteAd(confirmAd.id, {
      onSettled: () => {
        setDeletingId(null);
        setConfirmAd(null);
      },
    });
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {t("title")}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">{t("subtitle")}</p>
          </div>
          <Button
            onClick={handleDropZoneClick}
            disabled={isAdding}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm"
          >
            {isAdding ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Plus size={16} />
            )}
            {t("addBanner")}
          </Button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Upload / Drop Zone */}
        <div
          onClick={handleDropZoneClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
            {isAdding ? (
              <Loader2 size={22} className="text-blue-600 animate-spin" />
            ) : (
              <Upload size={22} className="text-blue-600" />
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              {isAdding ? t("uploading") : t("dropzone")}
            </p>
            <p className="text-xs text-gray-400 mt-1">{t("dropzoneHint")}</p>
          </div>
          <Button
            variant="outline"
            disabled={isAdding}
            className="text-sm mt-1 rounded-lg border-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              handleDropZoneClick();
            }}
          >
            {t("chooseFile")}
          </Button>
        </div>

        {/* Ads List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-gray-400 gap-2">
              <Loader2 size={20} className="animate-spin" />
              <span className="text-sm">{t("loading")}</span>
            </div>
          ) : ads.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Image size={36} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">{t("empty")}</p>
            </div>
          ) : (
            ads.map((ad) => (
              <div
                key={ad.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-white hover:shadow-sm transition-shadow"
              >
                {/* Thumbnail — clickable */}
                <button
                  onClick={() => setPreviewAd(ad)}
                  className="w-24 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 hover:ring-2 hover:ring-blue-400 transition-all"
                  title={t("previewImage")}
                >
                  <img
                    src={ad.image_url}
                    alt="banner"
                    className="w-full h-full object-cover"
                  />
                </button>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-400 truncate font-mono">
                      {ad.id}
                    </span>
                    <Badge
                      className={`text-xs px-2 py-0.5 rounded-full font-normal border ${
                        ad.is_active
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-gray-100 text-gray-500 border-gray-200"
                      }`}
                    >
                      {ad.is_active ? t("active") : t("inactive")}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(ad.created_at).toLocaleDateString("ar-EG", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={() => setConfirmAd(ad)}
                  disabled={deletingId === ad.id}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50 disabled:opacity-50 flex-shrink-0"
                  title={t("delete")}
                >
                  {deletingId === ad.id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Image Preview Lightbox ── */}
      {previewAd && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setPreviewAd(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewAd.image_url}
              alt="banner preview"
              className="w-full h-auto max-h-[80vh] object-contain bg-black"
            />
            <button
              onClick={() => setPreviewAd(null)}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {confirmAd && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => !isConfirmDeleting && setConfirmAd(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="flex items-center justify-center">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center">
                <AlertTriangle size={26} className="text-red-500" />
              </div>
            </div>

            {/* Text */}
            <div className="text-center space-y-1.5">
              <h3 className="text-base font-semibold text-gray-800">
                {t("confirmDeleteTitle")}
              </h3>
              <p className="text-sm text-gray-500">{t("confirmDeleteDesc")}</p>
            </div>

            {/* Preview thumb */}
            <div className="w-full h-24 rounded-xl overflow-hidden bg-gray-100">
              <img
                src={confirmAd.image_url}
                alt="banner"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl border-gray-200 text-gray-600"
                disabled={isConfirmDeleting}
                onClick={() => setConfirmAd(null)}
              >
                {t("cancel")}
              </Button>
              <Button
                className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 text-white"
                disabled={isConfirmDeleting}
                onClick={handleConfirmDelete}
              >
                {isConfirmDeleting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  t("confirmDelete")
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
