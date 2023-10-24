var config = {
    style: 'mapbox://styles/mapbox/light-v9',
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
            description: 'Umumnya kita melihat data populasi, jenis kelamin, usia, dan lain-lain disajikan dalam bentuk tabel atau infografis. Bagaimana jadinya jika kita melangkah sedikit lebih jauh dengan melihatnya dari <b>sisi spasial</b>. Halaman SpatialCitizen Semarang mengemas informasi demografi penduduk (citizen) Kota Semarang dari sisi geo-spasial. Memadukan data statistik, pemetaan 3D, dan cerita sederhana kita akan menengok dinamika kependudukan di Kota Semarang. <b>Swipe keatas</b> jika menggunakan dekstop dan <b>swipe kekiri</b> jika menggunakan smartphone',
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
            description: 'Kota Semarang terletak di bagian tengah Pulau Jawa sebagai ibukota dari Provinsi Jawa Tengah dengan koordinat geografis <b>6&deg; 54` - 7&deg; 10` LS</b> dan <b>110&deg; 20` - 110&deg; 30` BT</b>. Kota Semarang terbagi dalam <b>16 kecamatan</b> dengan <b>177 kelurahan</b>. Berbatasan langsung dengan Kabupaten Kendal di sebelah barat, Laut Jawa di sebelah utara, Kabupaten Semarang di sebelah selatan, dan Kabupaten Demak di sebelah timur.',
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
            description: 'Dengan luas wilayah sekitar 373.70 km<sup>2</sup>, Kota Semarang dihuni oleh <b>± 1.687 juta jiwa</b>. Sehingga, secara rata-rata kepadatan penduduk di Kota Semarang adalah <b>4,817 jiwa/km<sup>2</sup></b>. Pada halaman peta dapat diamati persebaran populasi penduduk di Kota Semarang.',
            location: {
                longitude: 110.39,
                latitude: -7.10,
                pitch: 0,
                bearing: 0,
                zoom: 10.15,
                duration: 5000
            },
            viewLayer: true,
            layerName: "JUMLAH PENDUDUK",
            buttonActive: false,
        },
        {
            id: 'fourth-identifier',
            title: 'Rasio Jenis Kelamin',
            image: './path/to/image/source.png',
            description: 'Rasio jenis kelamin pada tiap-tiap kelurahan cukup seimbang yaitu <b>835.000+</b> laki-laki dan <b>851.000+</b> perempuan, berikut ini persebaran penduduk untuk jenis kelamin laki-laki.',
            location: {
                longitude: 110.39,
                latitude: -7.01,
                pitch: 85,
                bearing: -15,
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
            description: 'Sebanyak <b>30,85%</b> penduduk Kota Semarang tamat SLTA/Sederajat. Dominasi kedua berikutnya adalah SMP/Sederajat sebesar <b>13,30%</b> dam ketiga adalah Diploma IV/Strata I sebesar <b>10,19%</b>. Berikut persebaran lulusan SLTA di Kota Semarang.',
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
            description: 'Penduduk Kota Semarang berdasarkan agama dan kepercayaan secara umum menganut agama <b>Islam</b> yaitu sebesar <b>87,27%</b>, dan sisanya terbagi dalam Kristen, Katholik, Hindu, Budha, Konghuchu dan Kepercayaan. Berikut ini distribusi agama Islam di Kota Semarang',
            location: {
                longitude: 110.39,
                latitude: -7.01,
                pitch: 85,
                bearing: -15,
                zoom: 10,
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
            description: 'Demikian gambaran umum dari dinamika kependudukan di Kota Semarang. Semoga informasi yang diperoleh dapat memperkaya pemahaman Anda tentang dinamika kota ini. Selanjutnya silahkan lanjutkan perjalanan anda mengenal karakteristik penduduk di Kota Semarang melalui <b style="color:#29b7a4">Demographic Map</b>. <br/> Let&apos;s go!',
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