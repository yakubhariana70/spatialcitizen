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
            title: 'Display Title',
            image: './path/to/image/source.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
            id: 'other-identifier',
            title: 'Second Title',
            image: './path/to/image/source.png',
            description: 'Copy these sections to add to your story.',
            location: {
                longitude: 110.4201,
                latitude: -7.11,
                pitch: 0,
                bearing: 0,
                zoom: 10,
                duration: 5000
            },
            viewLayer: false,
            layerName: null,
            buttonActive: false,
        },
        {
            id: 'other-identifier',
            title: 'Third Title',
            image: './path/to/image/source.png',
            description: 'Copy these sections to add to your story.',
            location: {
                longitude: 110.4201,
                latitude: -7.01,
                pitch: 90,
                bearing: -45,
                zoom: 9,
                duration: 3000
            },
            viewLayer: true,
            layerName: "JUMLAH PENDUDUK",
            buttonActive: false,
        },
        {
            id: 'forth-identifier',
            title: 'Fourth Title',
            image: './path/to/image/source.png',
            description: 'Persebaran penduduk di Kota Semarang berdasarkan kelamin pada tiap-tiap kelurahan cukup seimbang baik untuk laki-laki atau perempuan, berikut ini persebaran penduduk untuk jenis kelamin laki-laki',
            location: {
                longitude: 110.4201,
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
            title: 'Fifth Title',
            image: './path/to/image/source.png',
            description: 'Pendidikan menjadi salah satu aspek yang perlu diperhatikan dalam demografi suatu wilayah. Mari kita perhatikan sebaran penduduk lulusan SMP di Kota Semarang',
            location: {
                longitude: 110.4201,
                latitude: -7.01,
                pitch: 90,
                bearing: -45,
                zoom: 9,
                duration: 3000
            },
            viewLayer: true,
            layerName: "SLTP",
            buttonActive: true,
        }
    ]
};

export default config;