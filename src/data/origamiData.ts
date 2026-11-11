import { OrigamiLevel } from '../types';

export const origamiLevels: OrigamiLevel[] = [
  // =========================================================================
  // LEVEL 1: PETUALANGAN LIPATAN DASAR (PERAHU KERTAS)
  // =========================================================================
  {
    id: 1,
    slug: 'perahu-kertas',
    title: 'Level 1 – Petualangan Lipatan Dasar',
    subtitle: 'Mengenal Kertas, Garis Lipatan, dan Membentuk Perahu Kertas',
    finalArtName: 'Perahu Kertas Klasik',
    finalArtCategory: 'Transportasi',
    paperColor: '#EF4444', // Merah ceria
    paperBackFaceColor: '#FFFFFF', // Putih
    description: 'Pelajari konsep dasar melipat, membedakan lipatan gunung dan lembah, serta ciptakan perahu kertas yang dapat berlayar mengarungi samudra!',
    materials: ['1 Lembar Kertas Origami Persegi (15x15 cm)', 'Alas Meja Rata', 'Mata dan Tangan yang Teliti'],
    learningOutcomes: [
      'Mengenal bentuk bujur sangkar (persegi)',
      'Membedakan lipatan gunung (menonjol) dan lipatan lembah (cekung)',
      'Menyejajarkan garis dan sudut simetris',
      'Membentuk struktur perahu kertas 3D yang stabil'
    ],
    analysis: {
      question: 'Sebelum melipat, amati selembar kertas ini. Mengapa kita harus melipat tepat pada garis tengah dan mempertemukan kedua sudutnya secara simetris?',
      imageDescription: 'Kertas persegi merah dengan garis tengah putus-putus dan dua sisi yang saling berhadapan.',
      options: [
        {
          id: 'opt1',
          text: 'Agar kedua sisi seimbang sehingga perahu kertas tidak miring dan dapat mengapung tegak.',
          isCorrect: true,
          explanation: 'Tepat sekali! Keseimbangan sisi kiri dan kanan (simetri) membuat perahu seimbang saat ditaruh di air.'
        },
        {
          id: 'opt2',
          text: 'Hanya agar warnanya terlihat lebih terang dan mengkilap.',
          isCorrect: false,
          explanation: 'Warna kertas tidak berubah karena lipatan, namun kesimetrisan menentukan bentuk dan kestabilan perahu.'
        },
        {
          id: 'opt3',
          text: 'Supaya kertas menjadi lebih tebal dan berat saat dilipat.',
          isCorrect: false,
          explanation: 'Tujuan melipat bukan membuat berat, melainkan menciptakan bentuk ruang 3 dimensi yang seimbang.'
        }
      ]
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Langkah 1: Lipatan Tengah Mendatar (Lipatan Lembah)',
        description: 'Posisikan kertas berbentuk bujur sangkar. Lipat tepi bawah ke tepi atas tepat di garis tengah putus-putus.',
        reason: 'Membagi kertas menjadi dua bagian persegi panjang yang sama persis sebagai dasar rangka perahu.',
        foldType: 'lipatan_lembah',
        lineType: 'putus_putus',
        arrowDirection: 'atas',
        arrowLabel: 'Lipat ke Atas',
        keyPoints: ['Sudut bawah kiri bertemu sudut atas kiri', 'Sudut bawah kanan bertemu sudut atas kanan'],
        narrationText: 'Halo teman-teman! Langkah pertama, lipat kertas dari bawah ke atas tepat pada garis tengah. Perhatikan panah merah agar kedua sudut bertemu rapi!',
        meshConfig: {
          baseShape: 'square',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI,
          creaseAxis: 'horizontal',
          creasePosition: 0,
          foldedPart: 'bottom'
        }
      },
      {
        stepNumber: 2,
        title: 'Langkah 2: Melipat Kedua Sudut Atas Membentuk Segitiga',
        description: 'Tarik sudut kiri atas dan sudut kanan atas ke arah garis tengah hingga membentuk segitiga di bagian atas.',
        reason: 'Membentuk atap segitiga yang nantinya akan menjadi layar dan lambung perahu.',
        foldType: 'lipatan_sudut',
        lineType: 'putus_putus',
        arrowDirection: 'diagonal_kanan',
        arrowLabel: 'Tarik Sudut ke Garis Tengah',
        keyPoints: ['Titik sudut kanan dan kiri bertemu di garis sumbu tengah', 'Garis lipatan miring 45 derajat'],
        narrationText: 'Hebat! Sekarang lipat sudut kanan dan kiri atas ke arah tengah seperti membuat atap rumah. Tekan lipatan perlahan.',
        meshConfig: {
          baseShape: 'square',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI * 0.95,
          creaseAxis: 'diagonal_main',
          creasePosition: 0.2,
          foldedPart: 'top_right'
        }
      },
      {
        stepNumber: 3,
        title: 'Langkah 3: Melipat Sisi Bawah ke Atas (Lipatan Gunung)',
        description: 'Ambil lembaran bawah sisi depan dan lipat ke atas menutupi dasar segitiga. Balik kertas dan lakukan hal yang sama pada sisi belakang.',
        reason: 'Mengunci kedua sisi segitiga agar tidak terlepas dan membentuk pinggiran perahu.',
        foldType: 'lipatan_gunung',
        lineType: 'putus_putus',
        arrowDirection: 'atas',
        arrowLabel: 'Lipat Tepi Bawah ke Atas',
        keyPoints: ['Sisi depan dilipat ke depan', 'Sisi belakang dilipat ke belakang'],
        narrationText: 'Bagus sekali! Lipat pinggiran bawah ke atas seperti topi segitiga. Pastikan lipatan terkunci kuat.',
        meshConfig: {
          baseShape: 'triangle',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI * 0.9,
          creaseAxis: 'horizontal',
          creasePosition: -0.3,
          foldedPart: 'bottom'
        }
      },
      {
        stepNumber: 4,
        title: 'Langkah 4: Membuka Bagian Bawah Membentuk Belah Ketupat',
        description: 'Masukkan jari ke dalam rongga bawah, buka perlahan, lalu satukan kedua sudut samping hingga mendatar menjadi bentuk belah ketupat.',
        reason: 'Mengubah struktur segitiga datar menjadi bentuk intan belah ketupat yang memiliki ruang di dalamnya.',
        foldType: 'lipatan_tengah',
        lineType: 'titik_garis',
        arrowDirection: 'kanan',
        arrowLabel: 'Buka dan Satukan Kedua Sisi',
        keyPoints: ['Rongga dibuka dari tengah', 'Sudut kiri dan kanan ditarik merapat'],
        narrationText: 'Wah, lihat trik ini! Buka bagian tengahnya perlahan lalu tekan mendatar sehingga menjadi bentuk belah ketupat.',
        meshConfig: {
          baseShape: 'complex',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI * 0.8,
          creaseAxis: 'vertical',
          creasePosition: 0,
          foldedPart: 'left'
        }
      },
      {
        stepNumber: 5,
        title: 'Langkah 5: Menarik Kedua Ujung Sayap Membuka Perahu 3D',
        description: 'Pegang kedua ujung segitiga atas dengan lembut, lalu tarik perlahan ke arah luar hingga lambung perahu mengembang!',
        reason: 'Membuka lambung kapal 3 dimensi dan menaikkan layar utama di tengah perahu.',
        foldType: 'lipatan_lembah',
        lineType: 'putus_putus',
        arrowDirection: 'kanan',
        arrowLabel: 'Tarik Sayap ke Luar',
        keyPoints: ['Tarik kedua sayap ke samping bersamaan', 'Rapikan bagian dasar lambung agar perahu kokoh'],
        narrationText: 'Luar biasa! Sekarang tarik perlahan kedua ujung atas ke samping... dan tataplah perahu kertas 3D kita yang mengagumkan!',
        meshConfig: {
          baseShape: 'complex',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI * 0.6,
          creaseAxis: 'custom',
          creasePosition: 0.1,
          foldedPart: 'wings'
        }
      }
    ],
    reflection: {
      question: 'Setelah berhasil melipat perahu kertas, apa pengalaman paling berharga yang kamu pelajari hari ini?',
      options: [
        'Melipat dengan sabar dan teliti menghasilkan karya yang rapi dan seimbang.',
        'Kertas dapat berubah bentuk menjadi apa saja jika kita memahami teknik lipatannya.',
        'Seni melipat kertas melatih ketelitian tangan dan daya fokus berpikir.'
      ]
    }
  },

  // =========================================================================
  // LEVEL 2: PETUALANGAN PESAWAT KERTAS 3D
  // =========================================================================
  {
    id: 2,
    slug: 'pesawat-kertas',
    title: 'Level 2 – Petualangan Pesawat Kertas 3D',
    subtitle: 'Melipat Sudut Simetris, Membentuk Moncong Aerodinamis, dan Sayap Meluncur',
    finalArtName: 'Pesawat Supersonik Kertas',
    finalArtCategory: 'Transportasi',
    paperColor: '#3B82F6', // Biru angkasa
    paperBackFaceColor: '#FFFFFF',
    description: 'Ciptakan pesawat kertas dengan desain aerodinamis yang mampu meluncur jauh di udara. Pelajari keseimbangan sayap dan lipatan sudut tajam!',
    materials: ['1 Lembar Kertas Origami (Ukuran A4 atau Persegi)', 'Meja Rata', 'Uji Terbang di Ruang Kelas'],
    learningOutcomes: [
      'Membuat lipatan simetris vertikal',
      'Membentuk sudut runcing pada moncong pesawat',
      'Mengatur sudut dihedral sayap untuk kestabilan terbang',
      'Memahami pengaruh gaya aerodinamika pada kertas'
    ],
    analysis: {
      question: 'Mengapa kedua sayap pesawat kertas harus memiliki ukuran dan kemiringan sudut yang persis sama?',
      imageDescription: 'Gambar pesawat kertas dengan dua sayap dan moncong runcing yang seimbang di kedua sisi.',
      options: [
        {
          id: 'opt1',
          text: 'Agar aliran udara di sayap kiri dan kanan sama, sehingga pesawat tidak berputar dan jatuh miring.',
          isCorrect: true,
          explanation: 'Benar sekali! Keseimbangan aerodinamis sayap menjaga pesawat melayang lurus dan stabil di udara.'
        },
        {
          id: 'opt2',
          text: 'Supaya pesawat dapat mendarat tanpa menyentuh lantai kelas.',
          isCorrect: false,
          explanation: 'Pesawat kertas selalu ditarik gravitasi bumi, sayap yang seimbang membantu memperlama waktu melayang.'
        },
        {
          id: 'opt3',
          text: 'Hanya agar sayapnya terlihat lebih pendek.',
          isCorrect: false,
          explanation: 'Bukan untuk memperpendek, melainkan menciptakan daya angkat udara yang seimbang.'
        }
      ]
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Langkah 1: Lipatan Sumbu Tengah Memanjang',
        description: 'Lipat kertas menjadi dua bagian memanjang secara vertikal, tekan garis tengahnya, lalu buka kembali kertas.',
        reason: 'Membuat garis panduan sumbu utama pesawat sebagai patokan melipat sayap kiri dan kanan.',
        foldType: 'lipatan_lembah',
        lineType: 'putus_putus',
        arrowDirection: 'kanan',
        arrowLabel: 'Lipat Lalu Buka Kembali',
        keyPoints: ['Tepi kiri bertemu tepi kanan', 'Garis bekas lipatan berada tepat di poros tengah'],
        narrationText: 'Ayo mulai melipat pesawat! Lipat kertas memanjang menjadi dua, tekan garis tengahnya, lalu buka kembali sebagai garis panduan kita.',
        meshConfig: {
          baseShape: 'square',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI,
          creaseAxis: 'vertical',
          creasePosition: 0,
          foldedPart: 'left'
        }
      },
      {
        stepNumber: 2,
        title: 'Langkah 2: Melipat Sudut Kiri dan Kanan ke Tengah',
        description: 'Tarik sudut kiri atas dan sudut kanan atas merapat ke garis sumbu tengah, membentuk segitiga lancip di ujung atas.',
        reason: 'Membentuk moncong runcing yang akan menjadi hidung pesawat aerodinamis.',
        foldType: 'lipatan_sudut',
        lineType: 'putus_putus',
        arrowDirection: 'diagonal_kanan',
        arrowLabel: 'Tarik Sudut ke Garis Sumbu',
        keyPoints: ['Ujung kedua sudut bertemu di garis tengah', 'Kedua segitiga simetris kiri dan kanan'],
        narrationText: 'Tarik sudut kanan dan kiri atas menuju garis tengah. Perhatikan moncong atas agar lancip dan rapi!',
        meshConfig: {
          baseShape: 'square',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI * 0.95,
          creaseAxis: 'diagonal_main',
          creasePosition: 0.25,
          foldedPart: 'top_right'
        }
      },
      {
        stepNumber: 3,
        title: 'Langkah 3: Lipatan Kedua Mempertajam Moncong',
        description: 'Lipat kembali sisi luar miring ke arah garis tengah untuk kedua kalinya, sehingga badan pesawat menjadi semakin ramping.',
        reason: 'Membuat bentuk bodi pesawat ramping agar mengurangi gesekan udara saat terbang cepat.',
        foldType: 'lipatan_lembah',
        lineType: 'putus_putus',
        arrowDirection: 'diagonal_kiri',
        arrowLabel: 'Lipat Sisi Luar ke Dalam',
        keyPoints: ['Tepi miring sejajar garis tengah', 'Bodi pesawat tampak ramping dan tajam'],
        narrationText: 'Sekarang lipat sisi miring sekali lagi ke arah tengah. Ini membuat pesawat kita semakin ramping dan cepat melesat!',
        meshConfig: {
          baseShape: 'triangle',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI * 0.85,
          creaseAxis: 'diagonal_anti',
          creasePosition: 0.3,
          foldedPart: 'top_right'
        }
      },
      {
        stepNumber: 4,
        title: 'Langkah 4: Melipat Badan Pesawat Menjadi Dua Bagian',
        description: 'Tangkupkan kertas menjadi dua bagian dengan melipat sepanjang garis sumbu tengah ke arah belakang.',
        reason: 'Menyatukan badan pesawat agar menjadi satu kesatuan kokoh yang siap dibentuk sayapnya.',
        foldType: 'lipatan_gunung',
        lineType: 'putus_putus',
        arrowDirection: 'bawah',
        arrowLabel: 'Tangkupkan ke Belakang',
        keyPoints: ['Kedua sisi luar saling menempel', 'Bagian dalam lipatan tertutup rapi'],
        narrationText: 'Tangkupkan pesawat menjadi dua ke arah luar. Pegang bagian bawahnya yang akan menjadi badan pegangan pesawat.',
        meshConfig: {
          baseShape: 'triangle',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI,
          creaseAxis: 'vertical',
          creasePosition: 0,
          foldedPart: 'right'
        }
      },
      {
        stepNumber: 5,
        title: 'Langkah 5: Membentuk Sayap Kiri dan Kanan',
        description: 'Lipat bilah sayap atas ke bawah sejajar dengan tepi bawah badan pesawat. Balik kertas dan lipat sayap satunya dengan ukuran yang sama.',
        reason: 'Membentuk permukaan sayap yang akan menahan tekanan udara saat pesawat melayang.',
        foldType: 'lipatan_sayap',
        lineType: 'putus_putus',
        arrowDirection: 'bawah',
        arrowLabel: 'Lipat Sayap ke Bawah',
        keyPoints: ['Tinggi kedua sayap sama persis', 'Buka sayap sedikit ke atas membentuk huruf V lebar'],
        narrationText: 'Langkah terakhir, tekuk kedua sayap ke bawah secara seimbang, lalu buka sedikit membentuk huruf V. Pesawat supersonikmu siap mengudara!',
        meshConfig: {
          baseShape: 'complex',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI * 0.5,
          creaseAxis: 'horizontal',
          creasePosition: 0.1,
          foldedPart: 'wings'
        }
      }
    ],
    reflection: {
      question: 'Apa kunci utama agar pesawat kertaspun dapat melayang jauh dan stabil di udara?',
      options: [
        'Sayap yang simetris dan moncong yang ramping tanpa hambatan.',
        'Melempar sekuat tenaga tanpa memperhatikan arah angin.',
        'Kertas yang tebal dan banyak lem perekat.'
      ]
    }
  },

  // =========================================================================
  // LEVEL 3: PETUALANGAN HEWAN ORIGAMI 3D (IKAN)
  // =========================================================================
  {
    id: 3,
    slug: 'ikan-origami',
    title: 'Level 3 – Petualangan Hewan Origami 3D',
    subtitle: 'Membentuk Geometri Hewan, Sirip Dinamis, dan Ekor Melengkung',
    finalArtName: 'Ikan Koi Origami 3D',
    finalArtCategory: 'Hewan',
    paperColor: '#F59E0B', // Oranye keemasan
    paperBackFaceColor: '#FFFFFF',
    description: 'Ubah selembar kertas persegi menjadi ikan berenang yang lincah! Pelajari teknik lipatan diagonal menyilang, membentuk sirip samping, dan ekor lentur.',
    materials: ['1 Lembar Kertas Origami Warna-warni', 'Spidol untuk Menggambar Mata', 'Semangat Berkreasi'],
    learningOutcomes: [
      'Mengenal lipatan diagonal menyilang (X-fold)',
      'Membentuk bagian kepala, badan ikan, dan sirip',
      'Menciptakan efek visual 3D yang tampak hidup',
      'Mengasah apresiasi keindahan fauna air'
    ],
    analysis: {
      question: 'Amati bentuk ikan di alam. Bagaimana lipatan diagonal kertas dapat menghasilkan bentuk ikan yang tampak sedang meliuk berenang?',
      imageDescription: 'Gambar ikan koi dengan tubuh memanjang, sirip melengkung, dan ekor menyilang yang dinamis.',
      options: [
        {
          id: 'opt1',
          text: 'Sudut diagonal membentuk kepala runcing di depan dan ekor melebar di belakang seperti bentuk tubuh ikan asli.',
          isCorrect: true,
          explanation: 'Benar sekali! Geometri diagonal secara alami menghasilkan proporsi ramping di depan dan melebar di belakang.'
        },
        {
          id: 'opt2',
          text: 'Karena kertas origami terbuat dari bahan sisik ikan laut.',
          isCorrect: false,
          explanation: 'Kertas origami terbuat dari serat kayu halus, bukan dari bahan hewani.'
        },
        {
          id: 'opt3',
          text: 'Hanya kebetulan dan tidak memiliki hubungan bentuk geometris.',
          isCorrect: false,
          explanation: 'Seni origami berakar pada prinsip geometri yang sangat teliti.'
        }
      ]
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Langkah 1: Lipatan Diagonal Segitiga Besar',
        description: 'Posisikan kertas berbentuk belah ketupat. Lipat sudut bawah ke sudut atas membentuk segitiga besar, tekan garis lipatannya, lalu buka.',
        reason: 'Membuat garis diagonal utama yang membagi kertas menjadi dua segitiga simetris.',
        foldType: 'lipatan_lembah',
        lineType: 'putus_putus',
        arrowDirection: 'atas',
        arrowLabel: 'Lipat Sudut Bawah ke Atas',
        keyPoints: ['Sudut runcing saling berhimpit', 'Garis lipatan miring 45 derajat'],
        narrationText: 'Hai sahabat cerdas! Letakkan kertas seperti belah ketupat, lalu lipat sudut bawah ke atas membentuk segitiga. Buka kembali perlahan.',
        meshConfig: {
          baseShape: 'square',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI,
          creaseAxis: 'diagonal_main',
          creasePosition: 0,
          foldedPart: 'bottom'
        }
      },
      {
        stepNumber: 2,
        title: 'Langkah 2: Melipat Lipatan Layang-layang (Kite Fold)',
        description: 'Lipat tepi kanan atas dan kiri atas menuju garis diagonal tengah, membentuk bangun menyerupai layang-layang.',
        reason: 'Merampingkan bagian depan kertas menjadi moncong kepala ikan.',
        foldType: 'lipatan_sudut',
        lineType: 'putus_putus',
        arrowDirection: 'diagonal_kiri',
        arrowLabel: 'Tepi Menuju Garis Diagonal',
        keyPoints: ['Tepi kertas sejajar tepat di sumbu diagonal', 'Ujung atas menjadi lancip'],
        narrationText: 'Luar biasa! Sekarang lipat kedua tepi atas ke garis tengah seperti membuat layang-layang. Ini akan menjadi kepala ikan.',
        meshConfig: {
          baseShape: 'square',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI * 0.9,
          creaseAxis: 'diagonal_anti',
          creasePosition: 0.25,
          foldedPart: 'top_right'
        }
      },
      {
        stepNumber: 3,
        title: 'Langkah 3: Melipat Ujung Bawah ke Atas',
        description: 'Tarik sudut lancip bagian bawah ke atas menembus bagian tengah badan ikan.',
        reason: 'Menyiapkan lembaran kertas di bagian belakang yang akan dibelah menjadi sirip dan ekor.',
        foldType: 'lipatan_lembah',
        lineType: 'putus_putus',
        arrowDirection: 'atas',
        arrowLabel: 'Tarik Sudut Bawah ke Atas',
        keyPoints: ['Titik ujung bawah naik ke garis batas kepala', 'Menghasilkan lapisan kertas bertumpuk'],
        narrationText: 'Tarik sudut bawah ke arah atas. Perhatikan panah merah, tahan lipatannya dengan jari telunjuk.',
        meshConfig: {
          baseShape: 'triangle',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI * 0.8,
          creaseAxis: 'horizontal',
          creasePosition: -0.2,
          foldedPart: 'bottom'
        }
      },
      {
        stepNumber: 4,
        title: 'Langkah 4: Melipat Menyilang Membentuk Ekor Ikan',
        description: 'Tekuk kedua bilah ekor bagian belakang saling menyilang ke arah samping kiri dan kanan.',
        reason: 'Membentuk siluet sirip ekor ikan yang tampak dinamis dan melambai.',
        foldType: 'lipatan_sudut',
        lineType: 'putus_putus',
        arrowDirection: 'diagonal_kanan',
        arrowLabel: 'Silangkan Bilah Ekor',
        keyPoints: ['Ekor kiri menyilang ke kanan', 'Ekor kanan menyilang ke kiri'],
        narrationText: 'Bagus sekali! Sekarang silangkan kedua bilah kertas di bagian belakang. Lihat, ekor ikannya mulai terbentuk!',
        meshConfig: {
          baseShape: 'complex',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI * 0.7,
          creaseAxis: 'diagonal_main',
          creasePosition: 0.15,
          foldedPart: 'wings'
        }
      },
      {
        stepNumber: 5,
        title: 'Langkah 5: Membalik Kertas dan Memberikan Detail Mata',
        description: 'Balik karya origami ke sisi depan. Tekuk sedikit badan ikan agar cembung 3D, lalu gambar mata ikan yang ceria!',
        reason: 'Menampilkan sisi warna utama ikan dan menyempurnakan bentuk 3 dimensi yang tampak hidup.',
        foldType: 'lipatan_tengah',
        lineType: 'putus_putus',
        arrowDirection: 'kanan',
        arrowLabel: 'Balik Kertas dan Tekuk Melengkung',
        keyPoints: ['Sisi depan ikan menghadap ke kita', 'Beri lengkungan lembut di punggung ikan'],
        narrationText: 'Balikkan kertasmu ke sisi depan! Tekan lembut agar badannya sedikit menggembung 3D. Ikan koi origami kita tampak sangat lincah!',
        meshConfig: {
          baseShape: 'complex',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI * 0.4,
          creaseAxis: 'custom',
          creasePosition: 0,
          foldedPart: 'wings'
        }
      }
    ],
    reflection: {
      question: 'Apa perasaanmu setelah berhasil menyulap selembar kertas datar menjadi seekor hewan ikan yang cantik?',
      options: [
        'Sangat senang dan bangga karena dapat menciptakan karya seni dengan tangan sendiri!',
        'Ingin mencoba membuat hewan origami lainnya seperti katak, burung, atau kupu-kupu.',
        'Semakin mengagumi keindahan makhluk ciptaan Tuhan melalui seni rupa.'
      ]
    }
  },

  // =========================================================================
  // LEVEL 4: PETUALANGAN BUNGA ORIGAMI 3D (TULIP)
  // =========================================================================
  {
    id: 4,
    slug: 'bunga-tulip',
    title: 'Level 4 – Petualangan Bunga Origami 3D',
    subtitle: 'Menggabungkan Lipatan Kompleks, Membuka Kelopak, dan Merangkai Bunga',
    finalArtName: 'Bunga Tulip Mekar 3D',
    finalArtCategory: 'Tumbuhan',
    paperColor: '#EC4899', // Pink ceria
    paperBackFaceColor: '#FFFFFF',
    description: 'Pelajari keahlian melipat bunga tulip tiga dimensi yang mekar mempesona! Gabungkan kelopak mahkota bunga dengan tangkai hijau yang kokoh.',
    materials: ['1 Lembar Kertas Origami Merah/Pink (Bunga)', '1 Lembar Kertas Hijau (Tangkai dan Daun)', 'Ketelitian Tangan'],
    learningOutcomes: [
      'Menggabungkan lipatan segitiga ganda (Waterbomb Base)',
      'Membuka kelopak bunga 3D ke arah luar',
      'Merangkai dua bagian origami (kelopak dan tangkai)',
      'Menghasilkan karya seni dekoratif bernilai tinggi'
    ],
    analysis: {
      question: 'Bunga tulip di kebun bermekaran dari kuncup tertutup menjadi kelopak terbuka yang anggun. Mengapa pada origami tulip kita perlu membuka kelopak ke arah luar pada langkah terakhir?',
      imageDescription: 'Gambar kuncup bunga tulip yang membuka tiga kelopaknya membentuk piala mekar 3 dimensi.',
      options: [
        {
          id: 'opt1',
          text: 'Untuk memberikan rongga udara di bagian dalam sehingga bunga mekar mengembang 3 dimensi seperti bunga asli.',
          isCorrect: true,
          explanation: 'Tepat sekali! Membuka kelopak menciptakan ruang volume 3 dimensi yang tampak mekar secara alami.'
        },
        {
          id: 'opt2',
          text: 'Agar kelopak bunga robek dan menjadi tipis.',
          isCorrect: false,
          explanation: 'Kita membuka kelopak dengan hati-hati tanpa merobek kertas agar bentuknya tetap utuh dan kuat.'
        },
        {
          id: 'opt3',
          text: 'Supaya bunga tulip bisa dilipat kembali menjadi kertas datar.',
          isCorrect: false,
          explanation: 'Tujuan akhir adalah menampilkan keindahan karya mekar 3D, bukan meratakannya kembali.'
        }
      ]
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Langkah 1: Lipatan Silang Segitiga (Basis Segitiga Ganda)',
        description: 'Lipat kertas secara diagonal dari sudut ke sudut, buka, lalu lipat diagonal pada sisi lainnya hingga terbentuk tanda silang X.',
        reason: 'Mempersiapkan jalur lipatan diagonal ganda untuk membentuk dasar balon/kuncup (waterbomb base).',
        foldType: 'lipatan_lembah',
        lineType: 'putus_putus',
        arrowDirection: 'atas',
        arrowLabel: 'Lipat Diagonal Menyilang',
        keyPoints: ['Tanda silang berpotongan tepat di titik pusat kertas', 'Lipatan rapi dan tajam'],
        narrationText: 'Selamat datang di level terakhir! Mari membuat bunga tulip yang anggun. Lipat kertas secara diagonal dua kali hingga terbentuk tanda silang X.',
        meshConfig: {
          baseShape: 'square',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI,
          creaseAxis: 'diagonal_main',
          creasePosition: 0,
          foldedPart: 'bottom'
        }
      },
      {
        stepNumber: 2,
        title: 'Langkah 2: Menyatukan Keempat Sudut Membentuk Segitiga 3D',
        description: 'Dorong sisi samping kiri dan kanan ke arah dalam secara bersamaan, sehingga kertas terlipat menjadi segitiga berlapis empat.',
        reason: 'Mengubah lembaran datar menjadi basis segitiga bertumpuk yang memiliki 4 sayap kelopak.',
        foldType: 'lipatan_tengah',
        lineType: 'titik_garis',
        arrowDirection: 'bawah',
        arrowLabel: 'Dorong Sisi Samping ke Tengah',
        keyPoints: ['Dua sudut samping melipat ke dalam', 'Terbentuk segitiga dengan dua sayap di depan dan dua di belakang'],
        narrationText: 'Hebat! Tekan kedua sisi samping ke dalam sehingga membentuk segitiga berlapis. Ini disebut basis dasar waterbomb.',
        meshConfig: {
          baseShape: 'triangle',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI * 0.9,
          creaseAxis: 'vertical',
          creasePosition: 0,
          foldedPart: 'left'
        }
      },
      {
        stepNumber: 3,
        title: 'Langkah 3: Melipat Sayap Depan dan Belakang ke Puncak',
        description: 'Lipat sayap kanan dan kiri sisi depan ke arah puncak segitiga. Balik kertas dan ulangi hal yang sama pada sisi belakang.',
        reason: 'Membentuk persegi belah ketupat baru yang akan menjadi dinding kuncup bunga.',
        foldType: 'lipatan_sudut',
        lineType: 'putus_putus',
        arrowDirection: 'atas',
        arrowLabel: 'Lipat Ujung Sayap ke Puncak Atas',
        keyPoints: ['Keempat ujung sayap bertemu di titik puncak', 'Kertas membentuk intan persegi'],
        narrationText: 'Tarik ujung sayap depan ke puncak atas. Balikkan kertas, lalu ulangi untuk sayap belakang. Bagus sekali!',
        meshConfig: {
          baseShape: 'complex',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI * 0.85,
          creaseAxis: 'diagonal_anti',
          creasePosition: 0.2,
          foldedPart: 'top_right'
        }
      },
      {
        stepNumber: 4,
        title: 'Langkah 4: Menyelipkan Sayap Saling Mengunci',
        description: 'Lipat tepi kiri dan kanan saling bertumpuk sedikit melebihi garis tengah, lalu selipkan salah satu ujung ke dalam lipatan ujung lainnya.',
        reason: 'Mengunci dinding bunga agar saat ditiup atau dikembangkan, kuncup bunga tidak terbuka lepas.',
        foldType: 'lipatan_lembah',
        lineType: 'putus_putus',
        arrowDirection: 'kanan',
        arrowLabel: 'Selipkan Ujung Kertas ke Dalam',
        keyPoints: ['Ujung sayap saling mengunci rapat', 'Terdapat lubang kecil di bagian dasar kuncup'],
        narrationText: 'Sekarang selipkan ujung sayap ke dalam lipatan samping agar terkunci kuat. Perhatikan lubang kecil di bagian bawahnya ya.',
        meshConfig: {
          baseShape: 'complex',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI * 0.75,
          creaseAxis: 'vertical',
          creasePosition: 0.1,
          foldedPart: 'left'
        }
      },
      {
        stepNumber: 5,
        title: 'Langkah 5: Mengembangkan Badan dan Membuka Kelopak Mekar',
        description: 'Tiup lembut rongga bawah bunga agar bodi menggembung, lalu lenturkan keempat ujung kelopak atas ke arah luar membentuk mahkota mekar!',
        reason: 'Menghadirkan pesona mahkota bunga tulip yang mekar merekah seperti bunga musim semi.',
        foldType: 'lipatan_sayap',
        lineType: 'putus_putus',
        arrowDirection: 'atas',
        arrowLabel: 'Buka Kelopak Melengkung ke Luar',
        keyPoints: ['Bodi bunga menggelembung 3 dimensi', 'Keempat kelopak melengkung keluar dengan anggun'],
        narrationText: 'Langkah puncaknya! Tiup lembut lubang bawah agar kuncup mengembang, lalu buka keempat kelopaknya ke luar perlahan. Bunga tulip mekar kita selesai dengan sempurna!',
        meshConfig: {
          baseShape: 'complex',
          foldAngleStart: 0,
          foldAngleEnd: Math.PI * 0.5,
          creaseAxis: 'custom',
          creasePosition: 0.2,
          foldedPart: 'wings'
        }
      }
    ],
    reflection: {
      question: 'Apa pesan penting yang kamu peroleh dari seluruh petualangan melipat kertas origami SD Teramia ini?',
      options: [
        '"Setiap lipatan adalah proses belajar. Tidak harus langsung sempurna, yang penting berani mencoba dan terus berkreasi!"',
        'Kreativitas seni membuat hati gembira dan melatih kecerdasan tangan kita.',
        'Belajar seni rupa bersama teman-teman terasa sangat menyenangkan!'
      ]
    }
  }
];
