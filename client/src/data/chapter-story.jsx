var config = {
    style: 'mapbox://styles/mapbox/navigation-night-v1',
    accessToken: 'pk.eyJ1IjoieWFrdWJoYXJpYW5hNzAiLCJhIjoiY2xpZXBpOGszMDdxMDNkbXJhdzZiMWhxZCJ9.2rFjAut4puYPoKzc1kPFXA',
    showMarkers: true,
    theme: 'light',
    alignment: 'left',
    title: 'The Title Text of this Story',
    subtitle: 'A descriptive and interesting subtitle to draw in the reader',
    byline: 'By a Digital Storyteller',
    footer: 'Source: source citations, etc.',
    chapters: [
        {
            id: 'slug-style-id',
            title: 'Halo, Selamat Datang di SpatialCitizen Semarang!',
            image: './path/to/image/source.png',
            description: 'Umumnya kita melihat data populasi, jenis kelamin, usia, dan lain-lain disajikan dalam bentuk tabel atau infografis. Bagaimana jadinya jika kita melangkah sedikit lebih jauh dengan melihatnya dari sisi spasial. Halaman SpatialCitizen Semarang mengemas informasi demografi penduduk (citizen) Kota Semarang dari sisi geo-spasial. Memadukan data statistik, pemetaan 3D, dan cerita sederhana kita akan menengok dinamika kependudukan di Kota Semarang. Swipe keatas jika menggunakan dekstop dan swipe kekiri jika menggunakan smartphone',
            location: {
                longitude: 110.4201,
                latitude: -7.11,
                pitch: 0,
                bearing: 0,
                zoom: 5,
                duration: 2000
            },
            viewLayer: false,
            layerName: null,
            buttonActive: false,
        },
        {
            id: 'second-identifier',
            title: 'Wilayah Kota Semarang',
            image: './path/to/image/source.png',
            description: 'Kota Semarang terletak di bagian tengah Pulau Jawa sebagai ibukota dari Provinsi Jawa Tengah dengan koordinat geografis 6゜54` - 7゜10` LS dan 110゜20` - 110゜30` BT. Kota Semarang terbagi dalam 16 kecamatan dengan 177 kelurahan. Berbatasan langsung dengan Kabupaten Kendal di sebelah barat, Laut Jawa di sebelah utara, Kabupaten Semarang di sebelah selatan, dan Kabupaten Demak di sebelah timur.',
            location: {
                longitude: 110.39,
                latitude: -7.10,
                pitch: 0,
                bearing: 0,
                zoom: 10,
                duration: 5000
            },
            viewLayer: true,
            layerName: "LUAS WILAYAH (KM2)",
            buttonActive: false,
        },
        {
            id: 'third-identifier',
            title: 'Populasi Penduduk',
            image: './path/to/image/source.png',
            description: 'Dengan luas wilayah sekitar 373.70 km2, Kota Semarang dihuni oleh ± 1.687 juta jiwa. Sehingga, secara rata-rata kepadatan penduduk di Kota Semarang adalah 4,817 jiwa/km2. Pada halaman peta dapat diamati persebaran populasi penduduk di Kota Semarang.',
            location: {
                longitude: 110.39,
                latitude: -7.01,
                pitch: 45,
                bearing: 45,
                zoom: 9,
                duration: 3000
            },
            viewLayer: true,
            layerName: "JUMLAH PENDUDUK",
            buttonActive: false,
        },
        {
            id: 'fourth-identifier',
            title: 'Rasio Jenis Kelamin',
            image: './path/to/image/source.png',
            description: 'Rasio jenis kelamin pada tiap-tiap kelurahan cukup seimbang yaitu 835 ribu laki-laki dan 851 ribu perempuan, berikut ini persebaran penduduk untuk jenis kelamin laki-laki.',
            location: {
                longitude: 110.39,
                latitude: -7.01,
                pitch: 30,
                bearing: 30,
                zoom: 10,
                duration: 3000
            },
            viewLayer: true,
            layerName: "LAKI-LAKI",
            buttonActive: false,
        },
        {
            id: 'fifth-identifier',
            title: 'Dominasi Pendidikan',
            image: './path/to/image/source.png',
            description: 'Sebanyak 30,85% penduduk Kota Semarang memiliki tingkat pendidikan yang ditamatkan adalah SLTA/Sederajat. Dominasi kedua berikutnya adalah SMP/Sederajat sebesar 13,30% dam ketiga adalah Diploma IV/Strata I sebesar 10,19%. Berikut persebaran lulusan SLTA di Kota Semarang.',
            location: {
                longitude: 110.39,
                latitude: -7.01,
                pitch: 60,
                bearing: -30,
                zoom: 10,
                duration: 3000
            },
            viewLayer: true,
            layerName: "SLTA",
            buttonActive: false,
        },
        {
            id: 'sixth-identifier',
            title: 'Agama dan Kepercayaan',
            image: './path/to/image/source.png',
            description: 'Penduduk Kota Semarang berdasarkan agama dan kepercayaan secara umum menganut agama Islam yaitu sebesar 87,27%, dan sisanya terbagi dalam Kristen, Katholik, Hindu, Budha, Konghuchu dan Kepercayaan. Berikut ini distribusi agama Islam di Kota Semarang',
            location: {
                longitude: 110.4201,
                latitude: -7.01,
                pitch:15,
                bearing: 135,
                zoom: 9.5,
                duration: 3000
            },
            viewLayer: true,
            layerName: "ISLAM",
            buttonActive: false,
        },
        {
            id: 'seven-identifier',
            title: 'Next Step!',
            image: './path/to/image/source.png',
            description: 'Demikian gambaran umum dari dinamika kependudukan di Kota Semarang. Semoga informasi yang diperoleh dapat memperkaya pemahaman Anda tentang dinamika kota ini. Selanjutnya silahkan lanjutkan perjalanan anda mengenal karakteristik penduduk di Kota Semarang melalui tombol berikut.',
            location: {
                longitude: 110.4201,
                latitude: -7.01,
                pitch: 0,
                bearing: 0,
                zoom: 5,
                duration: 3000
            },
            viewLayer: false,
            layerName: "JUMLAH PENDUDUK",
            buttonActive: true,
        },
    ]
};

export default config;