import React from 'react';
import {
  X,
  BookOpen,
  HelpCircle,
  Volume2,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Trophy,
  Users,
  Compass,
  Scissors,
  Bookmark,
} from 'lucide-react';
import { soundFX } from '../utils/audio';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const ModalBase: React.FC<PopupProps> = ({ isOpen, onClose, title, children, icon }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border-4 border-amber-300 flex flex-col overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            {icon || <BookOpen className="w-6 h-6 text-amber-300" />}
            <h2 className="font-display font-black text-2xl tracking-wide text-amber-100">
              {title}
            </h2>
          </div>
          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 flex items-center justify-center text-white transition-all"
            aria-label="Tutup Jendela"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content with no main window scrolling */}
        <div className="p-6 overflow-y-auto max-h-[72vh] text-slate-800 text-base leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

// 1. PETUNJUK BERMAIN
export const GuideModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => (
  <ModalBase isOpen={isOpen} onClose={onClose} title="Petunjuk Bermain & Belajar">
    <div className="space-y-4">
      <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
        <h3 className="font-display font-black text-xl text-amber-900 mb-1">
          Selamat Datang di Dunia Origami SD Teramia!
        </h3>
        <p className="text-slate-700">
          Game ini dirancang khusus untuk pembelajaran Seni Rupa Kelas 3 SD melalui Interactive Flat Panel 75". Ikuti setiap tahapan seru berikut:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200">
          <div className="font-black text-red-600 text-lg mb-1">1. Menganalisis</div>
          <p className="text-sm text-slate-700">
            Amati pertanyaan pemantik dan pikirkan alasan mengapa kertas dilipat pada bagian tertentu sebelum mulai.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
          <div className="font-black text-blue-600 text-lg mb-1">2. Mengaplikasikan</div>
          <p className="text-sm text-slate-700">
            Ikuti animasi lipatan 3D langkah demi langkah. Siswa mempraktikkan langsung menggunakan kertas origami asli di kelas.
          </p>
        </div>

        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
          <div className="font-black text-emerald-600 text-lg mb-1">3. Teka-Teki Silang</div>
          <p className="text-sm text-slate-700">
            Uji pemahaman melalui kompetisi seru TIM MERAH vs TIM PUTIH dengan 10 soal TTS per tim di setiap level.
          </p>
        </div>
      </div>

      <div className="bg-slate-100 p-4 rounded-2xl">
        <h4 className="font-bold text-slate-800 mb-1">Aturan Skor Kompetisi 2 Tim:</h4>
        <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
          <li>Jawaban benar: <strong>+10 poin</strong></li>
          <li>Menggunakan petunjuk bantuan: <strong>-2 poin</strong></li>
          <li>Jawaban salah atau kosong: <strong>0 poin</strong></li>
          <li>Total skor maksimal per level: <strong>100 poin</strong></li>
        </ul>
      </div>
    </div>
  </ModalBase>
);

// 3. MENGENAL JENIS LIPATAN (Lipatan Lembah & Gunung)
export const FoldTypesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => (
  <ModalBase isOpen={isOpen} onClose={onClose} title="Mengenal Jenis-Jenis Lipatan" icon={<Compass className="w-6 h-6 text-amber-300" />}>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Lipatan Lembah */}
        <div className="p-5 rounded-2xl bg-blue-50 border-2 border-blue-300 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-blue-600"></span>
            <h4 className="font-display font-black text-xl text-blue-900">
              Lipatan Lembah (Valley Fold)
            </h4>
          </div>
          <p className="text-sm text-slate-700">
            Kertas dilipat ke arah depan sehingga bekas lipatan membentuk cekungan seperti lembah sungai.
          </p>
          <div className="bg-white p-3 rounded-xl border border-blue-200 text-xs font-mono text-blue-700">
            Simbol: Garis putus-putus tipis ( - - - - - )
          </div>
        </div>

        {/* Lipatan Gunung */}
        <div className="p-5 rounded-2xl bg-red-50 border-2 border-red-300 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-600"></span>
            <h4 className="font-display font-black text-xl text-red-900">
              Lipatan Gunung (Mountain Fold)
            </h4>
          </div>
          <p className="text-sm text-slate-700">
            Kertas dilipat ke arah belakang sehingga bekas lipatan membentuk puncak yang menonjol ke atas seperti gunung.
          </p>
          <div className="bg-white p-3 rounded-xl border border-red-200 text-xs font-mono text-red-700">
            Simbol: Garis titik-garis ( - · - · - · - )
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm text-amber-950 font-medium">
        💡 <strong>Tips Maskot ORI:</strong> Sebelum melipat, selalu pastikan sudut-sudut kertas saling berimpit rapi dan tekan garis lipatan dengan lembut menggunakan ibu jari.
      </div>
    </div>
  </ModalBase>
);

// 4. KAMUS MINI ORIGAMI
export const OrigamiGlossaryModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => (
  <ModalBase isOpen={isOpen} onClose={onClose} title="Kamus Mini Istilah Origami" icon={<Bookmark className="w-6 h-6 text-amber-300" />}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div className="font-bold text-red-600">Origami (折り紙)</div>
        <div className="text-slate-600">Seni tradisional melipat kertas dari Jepang (ori = melipat, kami = kertas).</div>
      </div>

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div className="font-bold text-red-600">Simetris</div>
        <div className="text-slate-600">Bentuk kedua sisi yang sama persis saat dilipat membagi dua.</div>
      </div>

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div className="font-bold text-red-600">Diagonal</div>
        <div className="text-slate-600">Garis miring yang menghubungkan dua sudut yang saling berseberangan.</div>
      </div>

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div className="font-bold text-red-600">Waterbomb Base</div>
        <div className="text-slate-600">Basis lipatan segitiga ganda untuk membuat bunga mekar atau balon.</div>
      </div>

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div className="font-bold text-red-600">Kite Fold</div>
        <div className="text-slate-600">Lipatan yang menghasilkan bentuk menyerupai layang-layang.</div>
      </div>

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div className="font-bold text-red-600">Crease (Garis Lipatan)</div>
        <div className="text-slate-600">Bekas guratan lipatan pada kertas yang menjadi panduan langkah selanjutnya.</div>
      </div>
    </div>
  </ModalBase>
);

// 5. BAHAN DAN ALAT
export const MaterialsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => (
  <ModalBase isOpen={isOpen} onClose={onClose} title="Bahan dan Alat Belajar Origami" icon={<Scissors className="w-6 h-6 text-amber-300" />}>
    <div className="space-y-3">
      <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl">
        <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg shrink-0">
          1
        </div>
        <div>
          <div className="font-bold text-slate-800">Kertas Origami Persegi (Bujur Sangkar)</div>
          <div className="text-sm text-slate-600">Ukuran ideal untuk siswa kelas 3 SD adalah 15 × 15 cm atau 16 × 16 cm dengan warna ceria bolak-balik (merah-putih).</div>
        </div>
      </div>

      <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg shrink-0">
          2
        </div>
        <div>
          <div className="font-bold text-slate-800">Alas Meja Rata dan Bersih</div>
          <div className="text-sm text-slate-600">Permukaan meja yang datar membantu menekan lipatan agar lurus dan presisi.</div>
        </div>
      </div>

      <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg shrink-0">
          3
        </div>
        <div>
          <div className="font-bold text-slate-800">Spidol Warna atau Pensil Hias</div>
          <div className="text-sm text-slate-600">Digunakan untuk memberi mata pada ikan origami atau bendera pada perahu kertas.</div>
        </div>
      </div>
    </div>
  </ModalBase>
);

// PENGATURAN SUARA
export const SoundSettingsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  narratorEnabled: boolean;
  setNarratorEnabled: (val: boolean) => void;
  sfxEnabled: boolean;
  setSfxEnabled: (val: boolean) => void;
  voiceRate: number;
  setVoiceRate: (val: number) => void;
  voiceVolume: number;
  setVoiceVolume: (val: number) => void;
}> = ({
  isOpen,
  onClose,
  narratorEnabled,
  setNarratorEnabled,
  sfxEnabled,
  setSfxEnabled,
  voiceRate,
  setVoiceRate,
  voiceVolume,
  setVoiceVolume,
}) => (
  <ModalBase isOpen={isOpen} onClose={onClose} title="Pengaturan Suara Narator & Efek" icon={<Volume2 className="w-6 h-6 text-amber-300" />}>
    <div className="space-y-5">
      {/* Toggles */}
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
        <div>
          <div className="font-bold text-slate-800 text-lg">Suara Narator (ORI)</div>
          <div className="text-sm text-slate-500">Narasi panduan berbahasa Indonesia</div>
        </div>
        <button
          onClick={() => setNarratorEnabled(!narratorEnabled)}
          className={`w-14 h-8 rounded-full transition-colors relative p-1 ${
            narratorEnabled ? 'bg-emerald-500' : 'bg-slate-300'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
              narratorEnabled ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
        <div>
          <div className="font-bold text-slate-800 text-lg">Efek Suara (SFX)</div>
          <div className="text-sm text-slate-500">Suara tombol, benar/salah, dan lipatan</div>
        </div>
        <button
          onClick={() => setSfxEnabled(!sfxEnabled)}
          className={`w-14 h-8 rounded-full transition-colors relative p-1 ${
            sfxEnabled ? 'bg-emerald-500' : 'bg-slate-300'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
              sfxEnabled ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Sliders */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
        <div>
          <div className="flex justify-between text-sm font-bold text-slate-700 mb-1">
            <span>Kecepatan Bicara Narator:</span>
            <span>{Math.round(voiceRate * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.7"
            max="1.3"
            step="0.05"
            value={voiceRate}
            onChange={(e) => setVoiceRate(parseFloat(e.target.value))}
            className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm font-bold text-slate-700 mb-1">
            <span>Volume Suara:</span>
            <span>{Math.round(voiceVolume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={voiceVolume}
            onChange={(e) => setVoiceVolume(parseFloat(e.target.value))}
            className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  </ModalBase>
);

// 13. RESET DATA KONFIRMASI
export const ResetConfirmModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ isOpen, onClose, onConfirm }) => (
  <ModalBase isOpen={isOpen} onClose={onClose} title="Konfirmasi Reset Nilai Permainan" icon={<AlertTriangle className="w-6 h-6 text-amber-300" />}>
    <div className="space-y-4 text-center">
      <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
        <RotateCcw className="w-8 h-8" />
      </div>

      <div className="text-xl font-black text-slate-900">
        Apakah Anda yakin ingin mengatur ulang skor dan riwayat permainan?
      </div>
      <p className="text-sm text-slate-600 max-w-md mx-auto">
        Semua skor Tim Merah dan Tim Putih dari seluruh level akan dihapus kembali ke 0.
      </p>

      <div className="flex items-center justify-center gap-4 pt-3">
        <button
          onClick={onClose}
          className="px-6 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-base transition-all"
        >
          Batal
        </button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-lg shadow-red-500/30 transition-all"
        >
          Ya, Reset Permainan
        </button>
      </div>
    </div>
  </ModalBase>
);
