import fs from 'node:fs';
import path from 'node:path';

export interface QuestionDef {
  clueNumber: number;
  direction: 'mendatar' | 'menurun';
  answer: string;
  startRow: number;
  startCol: number;
  question: string;
  explanation: string;
}

export interface GridDef {
  level: number;
  team: 'merah' | 'putih';
  gridRows: number;
  gridCols: number;
  questions: QuestionDef[];
}

const allGrids: GridDef[] = [
  // =========================================================================
  // LEVEL 1: PETUALANGAN LIPATAN DASAR (PERAHU KERTAS)
  // =========================================================================
  // TIM MERAH (Level 1)
  {
    level: 1,
    team: 'merah',
    gridRows: 10,
    gridCols: 10,
    questions: [
      {
        clueNumber: 1,
        direction: 'mendatar',
        startRow: 0,
        startCol: 0,
        answer: 'KERTAS',
        question: 'Bahan lembaran tipis yang dilipat untuk membentuk aneka karya origami.',
        explanation: 'Kertas adalah media utama dalam melipat seni origami.'
      },
      {
        clueNumber: 4,
        direction: 'mendatar',
        startRow: 2,
        startCol: 1,
        answer: 'LIPAT',
        question: 'Kegiatan menekuk kertas menjadi dua bagian atau lebih.',
        explanation: 'Melipat kertas merupakan gerakan inti dalam menciptakan origami.'
      },
      {
        clueNumber: 6,
        direction: 'mendatar',
        startRow: 4,
        startCol: 2,
        answer: 'PERAHU',
        question: 'Karya lipatan kertas yang berbentuk alat transportasi air.',
        explanation: 'Perahu kertas dibuat dengan melipat kertas hingga memiliki lambung dan layar.'
      },
      {
        clueNumber: 8,
        direction: 'mendatar',
        startRow: 6,
        startCol: 0,
        answer: 'GUNUNG',
        question: 'Jenis lipatan kertas yang puncaknya menonjol ke atas seperti bukit.',
        explanation: 'Lipatan gunung (mountain fold) membuat punggung lipatan mengarah ke atas.'
      },
      {
        clueNumber: 10,
        direction: 'mendatar',
        startRow: 8,
        startCol: 2,
        answer: 'SUDUT',
        question: 'Pojok runcing pada kertas yang harus dipertemukan secara presisi saat melipat.',
        explanation: 'Mempertemukan sudut dengan tepat membuat bentuk origami rapi dan seimbang.'
      },
      {
        clueNumber: 1,
        direction: 'menurun',
        startRow: 0,
        startCol: 0,
        answer: 'KOTAK',
        question: 'Bentuk kertas origami standar yang memiliki empat sisi sama panjang.',
        explanation: 'Kertas origami umumnya berukuran bujur sangkar atau persegi (kotak).'
      },
      {
        clueNumber: 2,
        direction: 'menurun',
        startRow: 0,
        startCol: 3,
        answer: 'TEPI',
        question: 'Pinggiran sisi kertas yang harus sejajar saat dilipat.',
        explanation: 'Menyejajarkan tepi kertas menghasilkan lipatan yang simetris.'
      },
      {
        clueNumber: 3,
        direction: 'menurun',
        startRow: 0,
        startCol: 4,
        answer: 'ALAT',
        question: 'Benda perlengkapan belajar seni seperti penggaris dan kertas origami.',
        explanation: 'Alat dan bahan yang lengkap membantu proses belajar seni origami lancar.'
      },
      {
        clueNumber: 7,
        direction: 'menurun',
        startRow: 4,
        startCol: 6,
        answer: 'HIAS',
        question: 'Kegiatan mempercantik hasil karya perahu kertas dengan gambar atau warna.',
        explanation: 'Perahu kertas dapat dipercantik dengan hiasan bendera kecil.'
      },
      {
        clueNumber: 9,
        direction: 'menurun',
        startRow: 6,
        startCol: 0,
        answer: 'GUA',
        question: 'Ceruk atau lorong alami di dalam bukit atau gunung berbatu.',
        explanation: 'Bentuk lipatan gunung mengingatkan kita pada pemandangan bukit dan gua alam.'
      }
    ]
  },

  // TIM PUTIH (Level 1)
  {
    level: 1,
    team: 'putih',
    gridRows: 10,
    gridCols: 10,
    questions: [
      {
        clueNumber: 1,
        direction: 'mendatar',
        startRow: 0,
        startCol: 0,
        answer: 'ORIGAMI',
        question: 'Seni tradisional melipat kertas yang berasal dari negara Jepang.',
        explanation: 'Kata origami berasal dari ori (melipat) dan kami (kertas).'
      },
      {
        clueNumber: 4,
        direction: 'mendatar',
        startRow: 2,
        startCol: 1,
        answer: 'LEMBAH',
        question: 'Jenis lipatan kertas yang membentuk lekukan cekung ke dalam.',
        explanation: 'Lipatan lembah (valley fold) membuat lipatan tampak seperti lembah sungai.'
      },
      {
        clueNumber: 6,
        direction: 'mendatar',
        startRow: 4,
        startCol: 1,
        answer: 'MERAH',
        question: 'Salah satu warna ceria pada kertas origami yang melambangkan keberanian.',
        explanation: 'Kertas origami dua sisi sering memadukan warna merah dan putih.'
      },
      {
        clueNumber: 8,
        direction: 'mendatar',
        startRow: 6,
        startCol: 2,
        answer: 'LAYAR',
        question: 'Bagian atas perahu kertas yang menjulang tegak menangkap angin.',
        explanation: 'Bagian segitiga di tengah perahu kertas menyerupai layar kapal.'
      },
      {
        clueNumber: 10,
        direction: 'mendatar',
        startRow: 8,
        startCol: 1,
        answer: 'PUTIH',
        question: 'Warna sisi belakang kertas origami yang bersih dan netral.',
        explanation: 'Sisi putih membantu melihat perbedaan antara sisi depan dan belakang lipatan.'
      },
      {
        clueNumber: 1,
        direction: 'menurun',
        startRow: 0,
        startCol: 0,
        answer: 'OMBAK',
        question: 'Gerakan riak air di permukaan laut tempat perahu kertas mengapung.',
        explanation: 'Perahu kertas meluncur indah di atas ombak yang tenang.'
      },
      {
        clueNumber: 2,
        direction: 'menurun',
        startRow: 0,
        startCol: 2,
        answer: 'IDEA',
        question: 'Gagasan atau imajinasi kreatif sebelum membuat karya seni.',
        explanation: 'Setiap karya origami berawal dari ide kreatif yang unik.'
      },
      {
        clueNumber: 3,
        direction: 'menurun',
        startRow: 0,
        startCol: 5,
        answer: 'MUAT',
        question: 'Dapat dimasukkan atau ditampung dengan rapi.',
        explanation: 'Karya perahu kertas dapat muat di atas telapak tangan anak.'
      },
      {
        clueNumber: 7,
        direction: 'menurun',
        startRow: 4,
        startCol: 1,
        answer: 'MAJU',
        question: 'Bergerak meluncur ke arah depan di atas permukaan air.',
        explanation: 'Perahu kertas dapat ditiup agar bergerak maju ke depan.'
      },
      {
        clueNumber: 9,
        direction: 'menurun',
        startRow: 6,
        startCol: 6,
        answer: 'RAPI',
        question: 'Kondisi lipatan yang teratur, presisi, dan tidak kusut.',
        explanation: 'Melipat dengan sabar membuat hasil perahu kertas sangat rapi.'
      }
    ]
  },

  // =========================================================================
  // LEVEL 2: PETUALANGAN PESAWAT KERTAS 3D
  // =========================================================================
  // TIM MERAH (Level 2)
  {
    level: 2,
    team: 'merah',
    gridRows: 10,
    gridCols: 10,
    questions: [
      {
        clueNumber: 1,
        direction: 'mendatar',
        startRow: 0,
        startCol: 1,
        answer: 'PESAWAT',
        question: 'Benda buatan manusia yang dirancang untuk meluncur dan terbang di angkasa.',
        explanation: 'Pesawat kertas bekerja dengan memanfaatkan aliran udara di bawah sayapnya.'
      },
      {
        clueNumber: 4,
        direction: 'mendatar',
        startRow: 2,
        startCol: 0,
        answer: 'SAYAP',
        question: 'Bagian pesawat yang membentang di kiri dan kanan untuk menahan udara.',
        explanation: 'Sayap pesawat kertas harus memiliki ukuran dan kemiringan yang seimbang.'
      },
      {
        clueNumber: 6,
        direction: 'mendatar',
        startRow: 4,
        startCol: 2,
        answer: 'UDARA',
        question: 'Zat gas tak terlihat di sekitar kita yang menopang pesawat saat melayang.',
        explanation: 'Udara menekan bagian bawah sayap sehingga pesawat kertas dapat terbang jauh.'
      },
      {
        clueNumber: 8,
        direction: 'mendatar',
        startRow: 6,
        startCol: 1,
        answer: 'HIDUNG',
        question: 'Bagian moncong paling depan pada pesawat yang berujung lancip.',
        explanation: 'Hidung pesawat yang runcing membantu membelah hambatan angin.'
      },
      {
        clueNumber: 10,
        direction: 'mendatar',
        startRow: 8,
        startCol: 2,
        answer: 'LAJU',
        question: 'Kecepatan gerak pesawat saat meluncur di udara.',
        explanation: 'Bentuk pesawat yang ramping menghasilkan laju terbang yang kencang.'
      },
      {
        clueNumber: 1,
        direction: 'menurun',
        startRow: 0,
        startCol: 1,
        answer: 'PIANO',
        question: 'Alat musik tuts yang menghasilkan nada indah dan harmonis.',
        explanation: 'Kreativitas seni origami melatih kepekaan rasa seperti memainkan musik.'
      },
      {
        clueNumber: 2,
        direction: 'menurun',
        startRow: 0,
        startCol: 3,
        answer: 'SIAP',
        question: 'Kondisi siap sebelum menerbangkan pesawat kertas ke angkasa.',
        explanation: 'Pastikan posisi sayap sudah seimbang sebelum pesawat diluncurkan.'
      },
      {
        clueNumber: 3,
        direction: 'menurun',
        startRow: 0,
        startCol: 6,
        answer: 'ANEKA',
        question: 'Beragam bentuk atau variasi lipatan pesawat kertas yang kreatif.',
        explanation: 'Ada aneka ragam jenis pesawat kertas seperti jet, glider, dan dart.'
      },
      {
        clueNumber: 7,
        direction: 'menurun',
        startRow: 4,
        startCol: 2,
        answer: 'USIA',
        question: 'Tingkat umur siswa yang sedang belajar melipat kertas di kelas.',
        explanation: 'Siswa usia kelas 3 SD sangat cocok belajar keterampilan melipat origami.'
      },
      {
        clueNumber: 9,
        direction: 'menurun',
        startRow: 6,
        startCol: 6,
        answer: 'GURU',
        question: 'Pendidik di kelas yang memandu siswa belajar melipat origami.',
        explanation: 'Guru membimbing langkah demi langkah membuat pesawat kertas.'
      }
    ]
  },

  // TIM PUTIH (Level 2)
  {
    level: 2,
    team: 'putih',
    gridRows: 10,
    gridCols: 10,
    questions: [
      {
        clueNumber: 1,
        direction: 'mendatar',
        startRow: 0,
        startCol: 0,
        answer: 'TERBANG',
        question: 'Melayang bergerak bebas mengarungi udara luas.',
        explanation: 'Pesawat kertas yang seimbang dapat terbang jauh dan stabil.'
      },
      {
        clueNumber: 4,
        direction: 'mendatar',
        startRow: 2,
        startCol: 1,
        answer: 'KANAN',
        question: 'Sisi samping yang berlawanan dengan arah kiri.',
        explanation: 'Sayap kanan harus dilipat sama persis dengan sayap kiri agar simetris.'
      },
      {
        clueNumber: 6,
        direction: 'mendatar',
        startRow: 4,
        startCol: 0,
        answer: 'LANCIP',
        question: 'Bentuk ujung runcing pada bagian moncong depan pesawat.',
        explanation: 'Ujung yang lancip membantu pesawat membelah angin lebih mudah.'
      },
      {
        clueNumber: 8,
        direction: 'mendatar',
        startRow: 6,
        startCol: 2,
        answer: 'ANGIN',
        question: 'Udara yang bergerak dan membantu menerbangkan pesawat kertas.',
        explanation: 'Angin yang berhembus lembut membantu pesawat melayang lebih lama.'
      },
      {
        clueNumber: 10,
        direction: 'mendatar',
        startRow: 8,
        startCol: 1,
        answer: 'CEPAT',
        question: 'Laju pesawat kertas yang melesat dalam waktu singkat.',
        explanation: 'Lipatan yang ramping membuat pesawat meluncur sangat cepat.'
      },
      {
        clueNumber: 1,
        direction: 'menurun',
        startRow: 0,
        startCol: 0,
        answer: 'TOTAL',
        question: 'Jumlah keseluruhan poin nilai yang diperoleh tim.',
        explanation: 'Total poin dihitung dari jumlah jawaban benar dikurangi pemakaian petunjuk.'
      },
      {
        clueNumber: 2,
        direction: 'menurun',
        startRow: 0,
        startCol: 3,
        answer: 'BENI',
        question: 'Nama teman siswa sekolah dasar yang ramah dan suka berkreasi.',
        explanation: 'Beni bersama teman-teman bergembira melipat pesawat kertas.'
      },
      {
        clueNumber: 3,
        direction: 'menurun',
        startRow: 0,
        startCol: 6,
        answer: 'GAYA',
        question: 'Dorongan atau tarikan yang membuat pesawat kertas melayang.',
        explanation: 'Gaya dorong tangan dan gaya angkat udara membuat pesawat terbang.'
      },
      {
        clueNumber: 7,
        direction: 'menurun',
        startRow: 4,
        startCol: 5,
        answer: 'PRIA',
        question: 'Laki-laki dewasa atau sebutan sosok bapak pendidik.',
        explanation: 'Guru pria mengajarkan teknik melempar pesawat kertas dengan benar.'
      },
      {
        clueNumber: 9,
        direction: 'menurun',
        startRow: 6,
        startCol: 2,
        answer: 'ANEH',
        question: 'Sesuatu yang unik, tidak biasa, atau memancing rasa ingin tahu.',
        explanation: 'Bentuk pesawat yang unik seringkali menghasilkan gaya terbang tak terduga.'
      }
    ]
  },

  // =========================================================================
  // LEVEL 3: PETUALANGAN HEWAN ORIGAMI 3D (IKAN)
  // =========================================================================
  // TIM MERAH (Level 3)
  {
    level: 3,
    team: 'merah',
    gridRows: 10,
    gridCols: 10,
    questions: [
      {
        clueNumber: 1,
        direction: 'mendatar',
        startRow: 0,
        startCol: 1,
        answer: 'HEWAN',
        question: 'Makhluk hidup yang dijadikan inspirasi bentuk origami seperti ikan dan burung.',
        explanation: 'Melipat kertas bentuk hewan melatih kepekaan terhadap alam sekitar.'
      },
      {
        clueNumber: 4,
        direction: 'mendatar',
        startRow: 2,
        startCol: 0,
        answer: 'SIRIP',
        question: 'Bagian tubuh ikan di samping dan punggung yang membantu berenang.',
        explanation: 'Pada origami ikan, lipatan segitiga kecil membentuk sirip yang cantik.'
      },
      {
        clueNumber: 6,
        direction: 'mendatar',
        startRow: 4,
        startCol: 2,
        answer: 'BADAN',
        question: 'Bagian tengah tubuh ikan tempat menempelnya sirip dan sisik.',
        explanation: 'Badan ikan origami dibentuk dari lipatan kertas yang simetris.'
      },
      {
        clueNumber: 8,
        direction: 'mendatar',
        startRow: 6,
        startCol: 1,
        answer: 'LAUT',
        question: 'Perairan asin luas yang menjadi habitat alami berbagai jenis ikan.',
        explanation: 'Origami ikan tampak seperti sedang berenang di dasar laut biru.'
      },
      {
        clueNumber: 10,
        direction: 'mendatar',
        startRow: 8,
        startCol: 0,
        answer: 'SISIK',
        question: 'Lapisan pelindung mengkilap di sekujur kulit tubuh ikan.',
        explanation: 'Kita bisa menggambar sisik ikan menggunakan spidol warna pada origami.'
      },
      {
        clueNumber: 1,
        direction: 'menurun',
        startRow: 0,
        startCol: 1,
        answer: 'HAI',
        question: 'Kata sapaan ceria dan ramah yang diucapkan maskot ORI.',
        explanation: 'Maskot ORI selalu menyapa dengan kata "Hai teman-teman SD TERAMIA!".'
      },
      {
        clueNumber: 2,
        direction: 'menurun',
        startRow: 0,
        startCol: 5,
        answer: 'NYATA',
        question: 'Tampak jelas dan berwujud karya nyata 3 dimensi.',
        explanation: 'Origami mengubah kertas datar menjadi karya tiga dimensi yang nyata.'
      },
      {
        clueNumber: 3,
        direction: 'menurun',
        startRow: 2,
        startCol: 0,
        answer: 'SUDUT',
        question: 'Pojok runcing yang dilipat membentuk moncong kepala ikan.',
        explanation: 'Sudut kertas yang dilipat diagonal membentuk kepala ikan origami.'
      },
      {
        clueNumber: 7,
        direction: 'menurun',
        startRow: 4,
        startCol: 2,
        answer: 'BUAT',
        question: 'Menciptakan atau memproduksi sebuah karya seni kertas.',
        explanation: 'Siswa kelas 3 SD terampil membuat origami ikan sendiri.'
      },
      {
        clueNumber: 9,
        direction: 'menurun',
        startRow: 6,
        startCol: 4,
        answer: 'TOKO',
        question: 'Tempat membeli perlengkapan sekolah dan kertas origami.',
        explanation: 'Kertas origami aneka warna dapat dibeli di toko alat tulis.'
      }
    ]
  },

  // TIM PUTIH (Level 3)
  {
    level: 3,
    team: 'putih',
    gridRows: 10,
    gridCols: 10,
    questions: [
      {
        clueNumber: 1,
        direction: 'mendatar',
        startRow: 0,
        startCol: 1,
        answer: 'INSANG',
        question: 'Alat pernapasan ikan di dalam air yang terletak di samping kepala.',
        explanation: 'Insang membantu ikan mengambil oksigen yang terlarut di dalam air.'
      },
      {
        clueNumber: 4,
        direction: 'mendatar',
        startRow: 2,
        startCol: 2,
        answer: 'EKOR',
        question: 'Bagian belakang ikan yang bergerak meliuk-liuk mendorong tubuh maju.',
        explanation: 'Ekor ikan origami dibuat dengan lipatan menyilang yang indah.'
      },
      {
        clueNumber: 6,
        direction: 'mendatar',
        startRow: 4,
        startCol: 1,
        answer: 'BERENANG',
        question: 'Gerakan ikan meluncur di dalam air menggunakan sirip dan ekornya.',
        explanation: 'Ikan dapat berenang dengan lincah menghindari rintangan.'
      },
      {
        clueNumber: 8,
        direction: 'mendatar',
        startRow: 6,
        startCol: 1,
        answer: 'KOLAM',
        question: 'Wadah perairan buatan tempat memelihara ikan hias.',
        explanation: 'Origami ikan dapat ditempel di kertas gambar bertema kolam ikan.'
      },
      {
        clueNumber: 10,
        direction: 'mendatar',
        startRow: 8,
        startCol: 0,
        answer: 'MATA',
        question: 'Indra penglihatan ikan yang bulat dan tidak memiliki kelopak.',
        explanation: 'Mata ikan origami bisa digambar dengan spidol hitam agar terlihat hidup.'
      },
      {
        clueNumber: 1,
        direction: 'menurun',
        startRow: 0,
        startCol: 1,
        answer: 'IKAN',
        question: 'Makhluk air bersirip yang menjadi tema utama origami level 3.',
        explanation: 'Ikan adalah hewan air yang lincah dan beraneka warna.'
      },
      {
        clueNumber: 2,
        direction: 'menurun',
        startRow: 0,
        startCol: 4,
        answer: 'ATOM',
        question: 'Bagian partikel terkecil penyusun semua benda di alam semesta.',
        explanation: 'Pengetahuan sains diajarkan berdampingan dengan kreativitas seni rupa.'
      },
      {
        clueNumber: 3,
        direction: 'menurun',
        startRow: 2,
        startCol: 5,
        answer: 'RASA',
        // In EKOR at (2,2), col 5 is 'R'. In BERENANG at (4,1): col 1=B, 2=E, 3=R, 4=E, 5=N, 6=A, 7=N, 8=G. Col 5 is 'N'!
        // Let's replace Down word at (2,5) with R-I-N-G (len 4):
        // row 2=R (matches EKOR at 2,5), row 3=I, row 4=N (matches BERENANG at 4,5!), row 5=G.
        // RING: lingkaran atau arena gelanggang!
        answer: 'RING',
        question: 'Bentuk lingkaran gelanggang atau cincin hiasan.',
        explanation: 'Mata ikan origami berbentuk lingkaran seperti ring kecil.'
      },
      {
        clueNumber: 7,
        direction: 'menurun',
        startRow: 4,
        startCol: 2,
        answer: 'BLOK',
        // In BERENANG at (4,1): col 2 is 'E'!
        // In KOLAM at (6,1): col 2 is 'O'!
        // Word starting with E and having 'O' at row 6:
        // E-K-O-N-O-M-I? E-L-O-K!
        // row 4=E (matches BERENANG at 4,2)
        // row 5=L
        // row 6=O (matches KOLAM at 6,2!)
        // row 7=K
        // ELOK: sangat elok / indah dipandang!
        answer: 'ELOK',
        question: 'Kondisi karya seni yang tampak sangat indah dan memesona.',
        explanation: 'Origami ikan yang dilipat rapi terlihat sangat elok.'
      },
      {
        clueNumber: 9,
        direction: 'menurun',
        startRow: 6,
        startCol: 5,
        answer: 'MAJU',
        question: 'Gerak meluncur ke depan mengarungi air.',
        explanation: 'Ikan menggerakkan ekornya agar meluncur maju ke depan.'
      }
    ]
  },

  // =========================================================================
  // LEVEL 4: PETUALANGAN BUNGA ORIGAMI 3D (TULIP)
  // =========================================================================
  // TIM MERAH (Level 4)
  {
    level: 4,
    team: 'merah',
    gridRows: 10,
    gridCols: 10,
    questions: [
      {
        clueNumber: 1,
        direction: 'mendatar',
        startRow: 0,
        startCol: 1,
        answer: 'TULIP',
        question: 'Bunga cantik berbentuk piala yang sangat populer dibuat dari origami.',
        explanation: 'Bunga tulip origami memiliki tiga kelopak mekar yang anggun.'
      },
      {
        clueNumber: 4,
        direction: 'mendatar',
        startRow: 2,
        startCol: 0,
        answer: 'KELOPAK',
        question: 'Helai mahkota bunga yang mekar mengelilingi bagian tengah.',
        explanation: 'Kelopak tulip dibentuk dengan membuka lipatan kertas ke arah luar.'
      },
      {
        clueNumber: 6,
        direction: 'mendatar',
        startRow: 4,
        startCol: 1,
        answer: 'TANGKAI',
        question: 'Batang penopang bunga yang berwarna hijau.',
        explanation: 'Tangkai tulip biasanya dibuat dari gulungan kertas hijau yang kokoh.'
      },
      {
        clueNumber: 8,
        direction: 'mendatar',
        startRow: 6,
        startCol: 2,
        answer: 'MEKAR',
        question: 'Kondisi kuncup bunga saat membuka kelopaknya menjadi lebar.',
        explanation: 'Bunga tulip tampak sangat indah saat kelopaknya mulai mekar.'
      },
      {
        clueNumber: 10,
        direction: 'mendatar',
        startRow: 8,
        startCol: 0,
        answer: 'TAMAN',
        question: 'Lahan asri penuh tanaman dan aneka bunga warna-warni.',
        explanation: 'Bunga tulip origami dapat dirangkai menjadi hiasan taman mini di kelas.'
      },
      {
        clueNumber: 1,
        direction: 'menurun',
        startRow: 0,
        startCol: 5,
        answer: 'PUAS',
        question: 'Rasa senang dan bangga setelah berhasil menyelesaikan karya origami.',
        explanation: 'Siswa merasa puas melihat bunga tulip hasil lipatannya mekar indah.'
      },
      {
        clueNumber: 2,
        direction: 'menurun',
        startRow: 2,
        startCol: 0,
        answer: 'KAYU',
        question: 'Bahan alami dari batang pohon untuk tusuk tangkai hiasan.',
        explanation: 'Tangkai bunga origami dapat disangga dengan sumpit kayu kecil.'
      },
      {
        clueNumber: 3,
        direction: 'menurun',
        startRow: 4,
        startCol: 1,
        answer: 'TOPI',
        question: 'Penutup kepala untuk melindungi diri dari panas matahari saat berkebun.',
        explanation: 'Topi bundar sering dipakai saat merawat bunga di kebun sekolah.'
      },
      {
        clueNumber: 7,
        direction: 'menurun',
        startRow: 4,
        startCol: 6,
        answer: 'ASRI',
        question: 'Suasana lingkungan taman bunga yang indah, sejuk, dan sedap dipandang.',
        explanation: 'Taman yang tertata asri membuat suasana belajar menjadi menyenangkan.'
      },
      {
        clueNumber: 9,
        direction: 'menurun',
        startRow: 6,
        startCol: 4,
        answer: 'KUNO',
        question: 'Zaman dahulu kala tempat tradisi melipat kertas mulai diciptakan.',
        explanation: 'Seni melipat kertas sudah ada sejak zaman kuno di benua Asia.'
      }
    ]
  },

  // TIM PUTIH (Level 4)
  {
    level: 4,
    team: 'putih',
    gridRows: 10,
    gridCols: 10,
    questions: [
      {
        clueNumber: 1,
        direction: 'mendatar',
        startRow: 0,
        startCol: 1,
        answer: 'BUNGA',
        question: 'Bagian tanaman yang memiliki warna memesona dan aroma harum.',
        explanation: 'Bunga origami menjadi simbol keindahan karya seni lipat kertas.'
      },
      {
        clueNumber: 4,
        direction: 'mendatar',
        startRow: 2,
        startCol: 0,
        answer: 'KUNCUP',
        question: 'Bentuk calon bunga sebelum mekar membuka kelopaknya.',
        explanation: 'Pada awal tutorial, kertas dilipat mengerucut menyerupai kuncup bunga.'
      },
      {
        clueNumber: 6,
        direction: 'mendatar',
        startRow: 4,
        startCol: 1,
        answer: 'HIASAN',
        question: 'Barang seni yang dipajang untuk memperindah ruangan kelas.',
        explanation: 'Bunga tulip origami sangat cocok dijadikan hiasan meja guru.'
      },
      {
        clueNumber: 8,
        direction: 'mendatar',
        startRow: 6,
        startCol: 2,
        answer: 'VAS',
        question: 'Wadah tempat menaruh dan menata rangkaian bunga.',
        explanation: 'Tiga tangkai bunga tulip origami dapat dimasukkan ke dalam vas mini.'
      },
      {
        clueNumber: 10,
        direction: 'mendatar',
        startRow: 8,
        startCol: 0,
        answer: 'DAUN',
        question: 'Bagian tumbuhan berwarna hijau yang menempel pada tangkai bunga.',
        explanation: 'Daun tulip origami dibuat dari lipatan kertas hijau yang memanjang.'
      },
      {
        clueNumber: 1,
        direction: 'menurun',
        startRow: 0,
        startCol: 1,
        answer: 'BAU',
        question: 'Aroma atau wangi semerbak yang tercium dari bunga mawar dan melati.',
        explanation: 'Bunga di alam memiliki bau harum yang menarik lebah dan kupu-kupu.'
      },
      {
        clueNumber: 2,
        direction: 'menurun',
        startRow: 0,
        startCol: 4,
        answer: 'GAUL',
        question: 'Sikap ramah, luwes bergaul, dan pandai menjalin persahabatan di kelas.',
        explanation: 'Belajar origami kelompok melatih anak bergaul dan bekerja sama.'
      },
      {
        clueNumber: 3,
        direction: 'menurun',
        startRow: 2,
        startCol: 0,
        answer: 'KOTA',
        question: 'Wilayah pemukiman yang ramai tempat sekolah SD Teramia berada.',
        explanation: 'Siswa SD Teramia bersemangat memajukan pendidikan seni di kota.'
      },
      {
        clueNumber: 7,
        direction: 'menurun',
        startRow: 4,
        startCol: 1,
        answer: 'HATI',
        question: 'Ungkapan perasaan gembira dan ikhlas saat berkreasi seni.',
        explanation: 'Karya seni yang dibuat dengan senang hati akan memancarkan keindahan.'
      },
      {
        clueNumber: 9,
        direction: 'menurun',
        startRow: 6,
        startCol: 4,
        answer: 'SUKA',
        question: 'Rasa gemar dan antusias mengikuti pelajaran seni melipat kertas.',
        explanation: 'Anak-anak sangat suka belajar membuat berbagai bentuk origami.'
      }
    ]
  }
];

// Validate all grids!
let allValid = true;
for (const grid of allGrids) {
  const board: string[][] = Array.from({ length: grid.gridRows }, () =>
    Array(grid.gridCols).fill('.')
  );

  console.log(`\nValidating Level ${grid.level} - Tim ${grid.team.toUpperCase()} (${grid.questions.length} questions)...`);
  if (grid.questions.length !== 10) {
    console.error(`ERROR: Level ${grid.level} Tim ${grid.team} has ${grid.questions.length} questions! Must be 10.`);
    allValid = false;
  }

  for (const q of grid.questions) {
    const word = q.answer.toUpperCase();
    for (let i = 0; i < word.length; i++) {
      const r = q.direction === 'mendatar' ? q.startRow : q.startRow + i;
      const c = q.direction === 'mendatar' ? q.startCol + i : q.startCol;

      if (r < 0 || r >= grid.gridRows || c < 0 || c >= grid.gridCols) {
        console.error(`OUT OF BOUNDS: ${word} at (${r},${c}) in L${grid.level} ${grid.team}`);
        allValid = false;
        continue;
      }

      if (board[r][c] !== '.' && board[r][c] !== word[i]) {
        console.error(`CONFLICT at (${r},${c}): existing '${board[r][c]}' vs new '${word[i]}' in ${word} (L${grid.level} ${grid.team})`);
        allValid = false;
      }
      board[r][c] = word[i];
    }
  }

  // Print board
  for (let r = 0; r < grid.gridRows; r++) {
    console.log(board[r].join(' '));
  }
}

if (!allValid) {
  console.error("\nValidation FAILED! Please fix errors above.");
  process.exit(1);
}

console.log("\nALL 8 GRIDS AND 80 QUESTIONS ARE 100% VALIDATED WITH ZERO CONFLICTS!");

// Write ttsData.ts
let fileContent = `import { TTSLevelData } from '../types';

export const ttsDataByLevelAndTeam: Record<number, Record<'merah' | 'putih', TTSLevelData>> = {
`;

for (let lvl = 1; lvl <= 4; lvl++) {
  fileContent += `  ${lvl}: {\n`;
  for (const team of ['merah', 'putih'] as const) {
    const g = allGrids.find(x => x.level === lvl && x.team === team)!;
    fileContent += `    ${team}: {\n`;
    fileContent += `      team: '${team}',\n`;
    fileContent += `      gridRows: ${g.gridRows},\n`;
    fileContent += `      gridCols: ${g.gridCols},\n`;
    fileContent += `      questions: [\n`;
    g.questions.forEach((q, idx) => {
      const qId = lvl * 100 + (team === 'merah' ? 0 : 50) + idx + 1;
      fileContent += `        {\n`;
      fileContent += `          id: ${qId},\n`;
      fileContent += `          clueNumber: ${q.clueNumber},\n`;
      fileContent += `          direction: '${q.direction}',\n`;
      fileContent += `          question: ${JSON.stringify(q.question)},\n`;
      fileContent += `          answer: '${q.answer}',\n`;
      fileContent += `          startRow: ${q.startRow},\n`;
      fileContent += `          startCol: ${q.startCol},\n`;
      fileContent += `          explanation: ${JSON.stringify(q.explanation)}\n`;
      fileContent += `        },\n`;
    });
    fileContent += `      ]\n`;
    fileContent += `    },\n`;
  }
  fileContent += `  },\n`;
}
fileContent += `};\n`;

fs.writeFileSync(path.resolve('./src/data/ttsData.ts'), fileContent, 'utf-8');
console.log("Successfully generated /src/data/ttsData.ts!");
