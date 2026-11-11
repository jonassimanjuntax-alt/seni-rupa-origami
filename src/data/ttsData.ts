import { TTSLevelData } from '../types';

export const ttsDataByLevelAndTeam: Record<number, Record<'merah' | 'putih', TTSLevelData>> = {
  1: {
    merah: {
      team: 'merah',
      gridRows: 10,
      gridCols: 10,
      questions: [
        {
          id: 101,
          clueNumber: 1,
          direction: 'mendatar',
          question: "Bahan lembaran tipis yang dilipat untuk membentuk aneka karya origami.",
          answer: 'KERTAS',
          startRow: 0,
          startCol: 0,
          explanation: "Kertas adalah media utama dalam melipat seni origami."
        },
        {
          id: 102,
          clueNumber: 4,
          direction: 'mendatar',
          question: "Kegiatan menekuk kertas menjadi dua bagian atau lebih.",
          answer: 'LIPAT',
          startRow: 2,
          startCol: 1,
          explanation: "Melipat kertas merupakan gerakan inti dalam menciptakan origami."
        },
        {
          id: 103,
          clueNumber: 6,
          direction: 'mendatar',
          question: "Karya lipatan kertas yang berbentuk alat transportasi air.",
          answer: 'PERAHU',
          startRow: 4,
          startCol: 2,
          explanation: "Perahu kertas dibuat dengan melipat kertas hingga memiliki lambung dan layar."
        },
        {
          id: 104,
          clueNumber: 8,
          direction: 'mendatar',
          question: "Jenis lipatan kertas yang puncaknya menonjol ke atas seperti bukit.",
          answer: 'GUNUNG',
          startRow: 6,
          startCol: 0,
          explanation: "Lipatan gunung (mountain fold) membuat punggung lipatan mengarah ke atas."
        },
        {
          id: 105,
          clueNumber: 10,
          direction: 'mendatar',
          question: "Pojok runcing pada kertas yang harus dipertemukan secara presisi saat melipat.",
          answer: 'SUDUT',
          startRow: 8,
          startCol: 2,
          explanation: "Mempertemukan sudut dengan tepat membuat bentuk origami rapi dan seimbang."
        },
        {
          id: 106,
          clueNumber: 1,
          direction: 'menurun',
          question: "Bentuk kertas origami standar yang memiliki empat sisi sama panjang.",
          answer: 'KOTAK',
          startRow: 0,
          startCol: 0,
          explanation: "Kertas origami umumnya berukuran bujur sangkar atau persegi (kotak)."
        },
        {
          id: 107,
          clueNumber: 2,
          direction: 'menurun',
          question: "Pinggiran sisi kertas yang harus sejajar saat dilipat.",
          answer: 'TEPI',
          startRow: 0,
          startCol: 3,
          explanation: "Menyejajarkan tepi kertas menghasilkan lipatan yang simetris."
        },
        {
          id: 108,
          clueNumber: 3,
          direction: 'menurun',
          question: "Benda perlengkapan belajar seni seperti penggaris dan kertas origami.",
          answer: 'ALAT',
          startRow: 0,
          startCol: 4,
          explanation: "Alat dan bahan yang lengkap membantu proses belajar seni origami lancar."
        },
        {
          id: 109,
          clueNumber: 7,
          direction: 'menurun',
          question: "Kegiatan mempercantik hasil karya perahu kertas dengan gambar atau warna.",
          answer: 'HIAS',
          startRow: 4,
          startCol: 6,
          explanation: "Perahu kertas dapat dipercantik dengan hiasan bendera kecil."
        },
        {
          id: 110,
          clueNumber: 9,
          direction: 'menurun',
          question: "Ceruk atau lorong alami di dalam bukit atau gunung berbatu.",
          answer: 'GUA',
          startRow: 6,
          startCol: 0,
          explanation: "Bentuk lipatan gunung mengingatkan kita pada pemandangan bukit dan gua alam."
        },
      ]
    },
    putih: {
      team: 'putih',
      gridRows: 10,
      gridCols: 10,
      questions: [
        {
          id: 151,
          clueNumber: 1,
          direction: 'mendatar',
          question: "Seni tradisional melipat kertas yang berasal dari negara Jepang.",
          answer: 'ORIGAMI',
          startRow: 0,
          startCol: 0,
          explanation: "Kata origami berasal dari ori (melipat) dan kami (kertas)."
        },
        {
          id: 152,
          clueNumber: 4,
          direction: 'mendatar',
          question: "Jenis lipatan kertas yang membentuk lekukan cekung ke dalam.",
          answer: 'LEMBAH',
          startRow: 2,
          startCol: 1,
          explanation: "Lipatan lembah (valley fold) membuat lipatan tampak seperti lembah sungai."
        },
        {
          id: 153,
          clueNumber: 6,
          direction: 'mendatar',
          question: "Salah satu warna ceria pada kertas origami yang melambangkan keberanian.",
          answer: 'MERAH',
          startRow: 4,
          startCol: 1,
          explanation: "Kertas origami dua sisi sering memadukan warna merah dan putih."
        },
        {
          id: 154,
          clueNumber: 8,
          direction: 'mendatar',
          question: "Bagian atas perahu kertas yang menjulang tegak menangkap angin.",
          answer: 'LAYAR',
          startRow: 6,
          startCol: 2,
          explanation: "Bagian segitiga di tengah perahu kertas menyerupai layar kapal."
        },
        {
          id: 155,
          clueNumber: 10,
          direction: 'mendatar',
          question: "Warna sisi belakang kertas origami yang bersih dan netral.",
          answer: 'PUTIH',
          startRow: 8,
          startCol: 1,
          explanation: "Sisi putih membantu melihat perbedaan antara sisi depan dan belakang lipatan."
        },
        {
          id: 156,
          clueNumber: 1,
          direction: 'menurun',
          question: "Gerakan riak air di permukaan laut tempat perahu kertas mengapung.",
          answer: 'OMBAK',
          startRow: 0,
          startCol: 0,
          explanation: "Perahu kertas meluncur indah di atas ombak yang tenang."
        },
        {
          id: 157,
          clueNumber: 2,
          direction: 'menurun',
          question: "Gagasan atau imajinasi kreatif sebelum membuat karya seni.",
          answer: 'IDEA',
          startRow: 0,
          startCol: 2,
          explanation: "Setiap karya origami berawal dari ide kreatif yang unik."
        },
        {
          id: 158,
          clueNumber: 3,
          direction: 'menurun',
          question: "Dapat dimasukkan atau ditampung dengan rapi.",
          answer: 'MUAT',
          startRow: 0,
          startCol: 5,
          explanation: "Karya perahu kertas dapat muat di atas telapak tangan anak."
        },
        {
          id: 159,
          clueNumber: 7,
          direction: 'menurun',
          question: "Bergerak meluncur ke arah depan di atas permukaan air.",
          answer: 'MAJU',
          startRow: 4,
          startCol: 1,
          explanation: "Perahu kertas dapat ditiup agar bergerak maju ke depan."
        },
        {
          id: 160,
          clueNumber: 9,
          direction: 'menurun',
          question: "Kondisi lipatan yang teratur, presisi, dan tidak kusut.",
          answer: 'RAPI',
          startRow: 6,
          startCol: 6,
          explanation: "Melipat dengan sabar membuat hasil perahu kertas sangat rapi."
        },
      ]
    },
  },
  2: {
    merah: {
      team: 'merah',
      gridRows: 10,
      gridCols: 10,
      questions: [
        {
          id: 201,
          clueNumber: 1,
          direction: 'mendatar',
          question: "Benda buatan manusia yang dirancang untuk meluncur dan terbang di angkasa.",
          answer: 'PESAWAT',
          startRow: 0,
          startCol: 1,
          explanation: "Pesawat kertas bekerja dengan memanfaatkan aliran udara di bawah sayapnya."
        },
        {
          id: 202,
          clueNumber: 4,
          direction: 'mendatar',
          question: "Bagian pesawat yang membentang di kiri dan kanan untuk menahan udara.",
          answer: 'SAYAP',
          startRow: 2,
          startCol: 0,
          explanation: "Sayap pesawat kertas harus memiliki ukuran dan kemiringan yang seimbang."
        },
        {
          id: 203,
          clueNumber: 6,
          direction: 'mendatar',
          question: "Zat gas tak terlihat di sekitar kita yang menopang pesawat saat melayang.",
          answer: 'UDARA',
          startRow: 4,
          startCol: 2,
          explanation: "Udara menekan bagian bawah sayap sehingga pesawat kertas dapat terbang jauh."
        },
        {
          id: 204,
          clueNumber: 8,
          direction: 'mendatar',
          question: "Bagian moncong paling depan pada pesawat yang berujung lancip.",
          answer: 'HIDUNG',
          startRow: 6,
          startCol: 1,
          explanation: "Hidung pesawat yang runcing membantu membelah hambatan angin."
        },
        {
          id: 205,
          clueNumber: 10,
          direction: 'mendatar',
          question: "Kecepatan gerak pesawat saat meluncur di udara.",
          answer: 'LAJU',
          startRow: 8,
          startCol: 2,
          explanation: "Bentuk pesawat yang ramping menghasilkan laju terbang yang kencang."
        },
        {
          id: 206,
          clueNumber: 1,
          direction: 'menurun',
          question: "Alat musik tuts yang menghasilkan nada indah dan harmonis.",
          answer: 'PIANO',
          startRow: 0,
          startCol: 1,
          explanation: "Kreativitas seni origami melatih kepekaan rasa seperti memainkan musik."
        },
        {
          id: 207,
          clueNumber: 2,
          direction: 'menurun',
          question: "Kondisi siap sebelum menerbangkan pesawat kertas ke angkasa.",
          answer: 'SIAP',
          startRow: 0,
          startCol: 3,
          explanation: "Pastikan posisi sayap sudah seimbang sebelum pesawat diluncurkan."
        },
        {
          id: 208,
          clueNumber: 3,
          direction: 'menurun',
          question: "Beragam bentuk atau variasi lipatan pesawat kertas yang kreatif.",
          answer: 'ANEKA',
          startRow: 0,
          startCol: 6,
          explanation: "Ada aneka ragam jenis pesawat kertas seperti jet, glider, dan dart."
        },
        {
          id: 209,
          clueNumber: 7,
          direction: 'menurun',
          question: "Tingkat umur siswa yang sedang belajar melipat kertas di kelas.",
          answer: 'USIA',
          startRow: 4,
          startCol: 2,
          explanation: "Siswa usia kelas 3 SD sangat cocok belajar keterampilan melipat origami."
        },
        {
          id: 210,
          clueNumber: 9,
          direction: 'menurun',
          question: "Pendidik di kelas yang memandu siswa belajar melipat origami.",
          answer: 'GURU',
          startRow: 6,
          startCol: 6,
          explanation: "Guru membimbing langkah demi langkah membuat pesawat kertas."
        },
      ]
    },
    putih: {
      team: 'putih',
      gridRows: 10,
      gridCols: 10,
      questions: [
        {
          id: 251,
          clueNumber: 1,
          direction: 'mendatar',
          question: "Melayang bergerak bebas mengarungi udara luas.",
          answer: 'TERBANG',
          startRow: 0,
          startCol: 0,
          explanation: "Pesawat kertas yang seimbang dapat terbang jauh dan stabil."
        },
        {
          id: 252,
          clueNumber: 4,
          direction: 'mendatar',
          question: "Sisi samping yang berlawanan dengan arah kiri.",
          answer: 'KANAN',
          startRow: 2,
          startCol: 1,
          explanation: "Sayap kanan harus dilipat sama persis dengan sayap kiri agar simetris."
        },
        {
          id: 253,
          clueNumber: 6,
          direction: 'mendatar',
          question: "Bentuk ujung runcing pada bagian moncong depan pesawat.",
          answer: 'LANCIP',
          startRow: 4,
          startCol: 0,
          explanation: "Ujung yang lancip membantu pesawat membelah angin lebih mudah."
        },
        {
          id: 254,
          clueNumber: 8,
          direction: 'mendatar',
          question: "Udara yang bergerak dan membantu menerbangkan pesawat kertas.",
          answer: 'ANGIN',
          startRow: 6,
          startCol: 2,
          explanation: "Angin yang berhembus lembut membantu pesawat melayang lebih lama."
        },
        {
          id: 255,
          clueNumber: 10,
          direction: 'mendatar',
          question: "Laju pesawat kertas yang melesat dalam waktu singkat.",
          answer: 'CEPAT',
          startRow: 8,
          startCol: 1,
          explanation: "Lipatan yang ramping membuat pesawat meluncur sangat cepat."
        },
        {
          id: 256,
          clueNumber: 1,
          direction: 'menurun',
          question: "Jumlah keseluruhan poin nilai yang diperoleh tim.",
          answer: 'TOTAL',
          startRow: 0,
          startCol: 0,
          explanation: "Total poin dihitung dari jumlah jawaban benar dikurangi pemakaian petunjuk."
        },
        {
          id: 257,
          clueNumber: 2,
          direction: 'menurun',
          question: "Nama teman siswa sekolah dasar yang ramah dan suka berkreasi.",
          answer: 'BENI',
          startRow: 0,
          startCol: 3,
          explanation: "Beni bersama teman-teman bergembira melipat pesawat kertas."
        },
        {
          id: 258,
          clueNumber: 3,
          direction: 'menurun',
          question: "Dorongan atau tarikan yang membuat pesawat kertas melayang.",
          answer: 'GAYA',
          startRow: 0,
          startCol: 6,
          explanation: "Gaya dorong tangan dan gaya angkat udara membuat pesawat terbang."
        },
        {
          id: 259,
          clueNumber: 7,
          direction: 'menurun',
          question: "Laki-laki dewasa atau sebutan sosok bapak pendidik.",
          answer: 'PRIA',
          startRow: 4,
          startCol: 5,
          explanation: "Guru pria mengajarkan teknik melempar pesawat kertas dengan benar."
        },
        {
          id: 260,
          clueNumber: 9,
          direction: 'menurun',
          question: "Sesuatu yang unik, tidak biasa, atau memancing rasa ingin tahu.",
          answer: 'ANEH',
          startRow: 6,
          startCol: 2,
          explanation: "Bentuk pesawat yang unik seringkali menghasilkan gaya terbang tak terduga."
        },
      ]
    },
  },
  3: {
    merah: {
      team: 'merah',
      gridRows: 10,
      gridCols: 10,
      questions: [
        {
          id: 301,
          clueNumber: 1,
          direction: 'mendatar',
          question: "Makhluk hidup yang dijadikan inspirasi bentuk origami seperti ikan dan burung.",
          answer: 'HEWAN',
          startRow: 0,
          startCol: 1,
          explanation: "Melipat kertas bentuk hewan melatih kepekaan terhadap alam sekitar."
        },
        {
          id: 302,
          clueNumber: 4,
          direction: 'mendatar',
          question: "Bagian tubuh ikan di samping dan punggung yang membantu berenang.",
          answer: 'SIRIP',
          startRow: 2,
          startCol: 0,
          explanation: "Pada origami ikan, lipatan segitiga kecil membentuk sirip yang cantik."
        },
        {
          id: 303,
          clueNumber: 6,
          direction: 'mendatar',
          question: "Bagian tengah tubuh ikan tempat menempelnya sirip dan sisik.",
          answer: 'BADAN',
          startRow: 4,
          startCol: 2,
          explanation: "Badan ikan origami dibentuk dari lipatan kertas yang simetris."
        },
        {
          id: 304,
          clueNumber: 8,
          direction: 'mendatar',
          question: "Perairan asin luas yang menjadi habitat alami berbagai jenis ikan.",
          answer: 'LAUT',
          startRow: 6,
          startCol: 1,
          explanation: "Origami ikan tampak seperti sedang berenang di dasar laut biru."
        },
        {
          id: 305,
          clueNumber: 10,
          direction: 'mendatar',
          question: "Lapisan pelindung mengkilap di sekujur kulit tubuh ikan.",
          answer: 'SISIK',
          startRow: 8,
          startCol: 0,
          explanation: "Kita bisa menggambar sisik ikan menggunakan spidol warna pada origami."
        },
        {
          id: 306,
          clueNumber: 1,
          direction: 'menurun',
          question: "Kata sapaan ceria dan ramah yang diucapkan maskot ORI.",
          answer: 'HAI',
          startRow: 0,
          startCol: 1,
          explanation: "Maskot ORI selalu menyapa dengan kata \"Hai teman-teman SD TERAMIA!\"."
        },
        {
          id: 307,
          clueNumber: 2,
          direction: 'menurun',
          question: "Tampak jelas dan berwujud karya nyata 3 dimensi.",
          answer: 'NYATA',
          startRow: 0,
          startCol: 5,
          explanation: "Origami mengubah kertas datar menjadi karya tiga dimensi yang nyata."
        },
        {
          id: 308,
          clueNumber: 3,
          direction: 'menurun',
          question: "Pojok runcing yang dilipat membentuk moncong kepala ikan.",
          answer: 'SUDUT',
          startRow: 2,
          startCol: 0,
          explanation: "Sudut kertas yang dilipat diagonal membentuk kepala ikan origami."
        },
        {
          id: 309,
          clueNumber: 7,
          direction: 'menurun',
          question: "Menciptakan atau memproduksi sebuah karya seni kertas.",
          answer: 'BUAT',
          startRow: 4,
          startCol: 2,
          explanation: "Siswa kelas 3 SD terampil membuat origami ikan sendiri."
        },
        {
          id: 310,
          clueNumber: 9,
          direction: 'menurun',
          question: "Tempat membeli perlengkapan sekolah dan kertas origami.",
          answer: 'TOKO',
          startRow: 6,
          startCol: 4,
          explanation: "Kertas origami aneka warna dapat dibeli di toko alat tulis."
        },
      ]
    },
    putih: {
      team: 'putih',
      gridRows: 10,
      gridCols: 10,
      questions: [
        {
          id: 351,
          clueNumber: 1,
          direction: 'mendatar',
          question: "Alat pernapasan ikan di dalam air yang terletak di samping kepala.",
          answer: 'INSANG',
          startRow: 0,
          startCol: 1,
          explanation: "Insang membantu ikan mengambil oksigen yang terlarut di dalam air."
        },
        {
          id: 352,
          clueNumber: 4,
          direction: 'mendatar',
          question: "Bagian belakang ikan yang bergerak meliuk-liuk mendorong tubuh maju.",
          answer: 'EKOR',
          startRow: 2,
          startCol: 2,
          explanation: "Ekor ikan origami dibuat dengan lipatan menyilang yang indah."
        },
        {
          id: 353,
          clueNumber: 6,
          direction: 'mendatar',
          question: "Gerakan ikan meluncur di dalam air menggunakan sirip dan ekornya.",
          answer: 'BERENANG',
          startRow: 4,
          startCol: 1,
          explanation: "Ikan dapat berenang dengan lincah menghindari rintangan."
        },
        {
          id: 354,
          clueNumber: 8,
          direction: 'mendatar',
          question: "Wadah perairan buatan tempat memelihara ikan hias.",
          answer: 'KOLAM',
          startRow: 6,
          startCol: 1,
          explanation: "Origami ikan dapat ditempel di kertas gambar bertema kolam ikan."
        },
        {
          id: 355,
          clueNumber: 10,
          direction: 'mendatar',
          question: "Indra penglihatan ikan yang bulat dan tidak memiliki kelopak.",
          answer: 'MATA',
          startRow: 8,
          startCol: 0,
          explanation: "Mata ikan origami bisa digambar dengan spidol hitam agar terlihat hidup."
        },
        {
          id: 356,
          clueNumber: 1,
          direction: 'menurun',
          question: "Makhluk air bersirip yang menjadi tema utama origami level 3.",
          answer: 'IKAN',
          startRow: 0,
          startCol: 1,
          explanation: "Ikan adalah hewan air yang lincah dan beraneka warna."
        },
        {
          id: 357,
          clueNumber: 2,
          direction: 'menurun',
          question: "Bagian partikel terkecil penyusun semua benda di alam semesta.",
          answer: 'ATOM',
          startRow: 0,
          startCol: 4,
          explanation: "Pengetahuan sains diajarkan berdampingan dengan kreativitas seni rupa."
        },
        {
          id: 358,
          clueNumber: 3,
          direction: 'menurun',
          question: "Bentuk lingkaran gelanggang atau cincin hiasan.",
          answer: 'RING',
          startRow: 2,
          startCol: 5,
          explanation: "Mata ikan origami berbentuk lingkaran seperti ring kecil."
        },
        {
          id: 359,
          clueNumber: 7,
          direction: 'menurun',
          question: "Kondisi karya seni yang tampak sangat indah dan memesona.",
          answer: 'ELOK',
          startRow: 4,
          startCol: 2,
          explanation: "Origami ikan yang dilipat rapi terlihat sangat elok."
        },
        {
          id: 360,
          clueNumber: 9,
          direction: 'menurun',
          question: "Gerak meluncur ke depan mengarungi air.",
          answer: 'MAJU',
          startRow: 6,
          startCol: 5,
          explanation: "Ikan menggerakkan ekornya agar meluncur maju ke depan."
        },
      ]
    },
  },
  4: {
    merah: {
      team: 'merah',
      gridRows: 10,
      gridCols: 10,
      questions: [
        {
          id: 401,
          clueNumber: 1,
          direction: 'mendatar',
          question: "Bunga cantik berbentuk piala yang sangat populer dibuat dari origami.",
          answer: 'TULIP',
          startRow: 0,
          startCol: 1,
          explanation: "Bunga tulip origami memiliki tiga kelopak mekar yang anggun."
        },
        {
          id: 402,
          clueNumber: 4,
          direction: 'mendatar',
          question: "Helai mahkota bunga yang mekar mengelilingi bagian tengah.",
          answer: 'KELOPAK',
          startRow: 2,
          startCol: 0,
          explanation: "Kelopak tulip dibentuk dengan membuka lipatan kertas ke arah luar."
        },
        {
          id: 403,
          clueNumber: 6,
          direction: 'mendatar',
          question: "Batang penopang bunga yang berwarna hijau.",
          answer: 'TANGKAI',
          startRow: 4,
          startCol: 1,
          explanation: "Tangkai tulip biasanya dibuat dari gulungan kertas hijau yang kokoh."
        },
        {
          id: 404,
          clueNumber: 8,
          direction: 'mendatar',
          question: "Kondisi kuncup bunga saat membuka kelopaknya menjadi lebar.",
          answer: 'MEKAR',
          startRow: 6,
          startCol: 2,
          explanation: "Bunga tulip tampak sangat indah saat kelopaknya mulai mekar."
        },
        {
          id: 405,
          clueNumber: 10,
          direction: 'mendatar',
          question: "Lahan asri penuh tanaman dan aneka bunga warna-warni.",
          answer: 'TAMAN',
          startRow: 8,
          startCol: 0,
          explanation: "Bunga tulip origami dapat dirangkai menjadi hiasan taman mini di kelas."
        },
        {
          id: 406,
          clueNumber: 1,
          direction: 'menurun',
          question: "Rasa senang dan bangga setelah berhasil menyelesaikan karya origami.",
          answer: 'PUAS',
          startRow: 0,
          startCol: 5,
          explanation: "Siswa merasa puas melihat bunga tulip hasil lipatannya mekar indah."
        },
        {
          id: 407,
          clueNumber: 2,
          direction: 'menurun',
          question: "Bahan alami dari batang pohon untuk tusuk tangkai hiasan.",
          answer: 'KAYU',
          startRow: 2,
          startCol: 0,
          explanation: "Tangkai bunga origami dapat disangga dengan sumpit kayu kecil."
        },
        {
          id: 408,
          clueNumber: 3,
          direction: 'menurun',
          question: "Penutup kepala untuk melindungi diri dari panas matahari saat berkebun.",
          answer: 'TOPI',
          startRow: 4,
          startCol: 1,
          explanation: "Topi bundar sering dipakai saat merawat bunga di kebun sekolah."
        },
        {
          id: 409,
          clueNumber: 7,
          direction: 'menurun',
          question: "Suasana lingkungan taman bunga yang indah, sejuk, dan sedap dipandang.",
          answer: 'ASRI',
          startRow: 4,
          startCol: 6,
          explanation: "Taman yang tertata asri membuat suasana belajar menjadi menyenangkan."
        },
        {
          id: 410,
          clueNumber: 9,
          direction: 'menurun',
          question: "Zaman dahulu kala tempat tradisi melipat kertas mulai diciptakan.",
          answer: 'KUNO',
          startRow: 6,
          startCol: 4,
          explanation: "Seni melipat kertas sudah ada sejak zaman kuno di benua Asia."
        },
      ]
    },
    putih: {
      team: 'putih',
      gridRows: 10,
      gridCols: 10,
      questions: [
        {
          id: 451,
          clueNumber: 1,
          direction: 'mendatar',
          question: "Bagian tanaman yang memiliki warna memesona dan aroma harum.",
          answer: 'BUNGA',
          startRow: 0,
          startCol: 1,
          explanation: "Bunga origami menjadi simbol keindahan karya seni lipat kertas."
        },
        {
          id: 452,
          clueNumber: 4,
          direction: 'mendatar',
          question: "Bentuk calon bunga sebelum mekar membuka kelopaknya.",
          answer: 'KUNCUP',
          startRow: 2,
          startCol: 0,
          explanation: "Pada awal tutorial, kertas dilipat mengerucut menyerupai kuncup bunga."
        },
        {
          id: 453,
          clueNumber: 6,
          direction: 'mendatar',
          question: "Barang seni yang dipajang untuk memperindah ruangan kelas.",
          answer: 'HIASAN',
          startRow: 4,
          startCol: 1,
          explanation: "Bunga tulip origami sangat cocok dijadikan hiasan meja guru."
        },
        {
          id: 454,
          clueNumber: 8,
          direction: 'mendatar',
          question: "Wadah tempat menaruh dan menata rangkaian bunga.",
          answer: 'VAS',
          startRow: 6,
          startCol: 2,
          explanation: "Tiga tangkai bunga tulip origami dapat dimasukkan ke dalam vas mini."
        },
        {
          id: 455,
          clueNumber: 10,
          direction: 'mendatar',
          question: "Bagian tumbuhan berwarna hijau yang menempel pada tangkai bunga.",
          answer: 'DAUN',
          startRow: 8,
          startCol: 0,
          explanation: "Daun tulip origami dibuat dari lipatan kertas hijau yang memanjang."
        },
        {
          id: 456,
          clueNumber: 1,
          direction: 'menurun',
          question: "Aroma atau wangi semerbak yang tercium dari bunga mawar dan melati.",
          answer: 'BAU',
          startRow: 0,
          startCol: 1,
          explanation: "Bunga di alam memiliki bau harum yang menarik lebah dan kupu-kupu."
        },
        {
          id: 457,
          clueNumber: 2,
          direction: 'menurun',
          question: "Sikap ramah, luwes bergaul, dan pandai menjalin persahabatan di kelas.",
          answer: 'GAUL',
          startRow: 0,
          startCol: 4,
          explanation: "Belajar origami kelompok melatih anak bergaul dan bekerja sama."
        },
        {
          id: 458,
          clueNumber: 3,
          direction: 'menurun',
          question: "Wilayah pemukiman yang ramai tempat sekolah SD Teramia berada.",
          answer: 'KOTA',
          startRow: 2,
          startCol: 0,
          explanation: "Siswa SD Teramia bersemangat memajukan pendidikan seni di kota."
        },
        {
          id: 459,
          clueNumber: 7,
          direction: 'menurun',
          question: "Ungkapan perasaan gembira dan ikhlas saat berkreasi seni.",
          answer: 'HATI',
          startRow: 4,
          startCol: 1,
          explanation: "Karya seni yang dibuat dengan senang hati akan memancarkan keindahan."
        },
        {
          id: 460,
          clueNumber: 9,
          direction: 'menurun',
          question: "Rasa gemar dan antusias mengikuti pelajaran seni melipat kertas.",
          answer: 'SUKA',
          startRow: 6,
          startCol: 4,
          explanation: "Anak-anak sangat suka belajar membuat berbagai bentuk origami."
        },
      ]
    },
  },
};
