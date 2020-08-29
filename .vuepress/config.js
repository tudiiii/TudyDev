module.exports = {
    base: '/TudyDev/',
    title: '코린투디',
    description: 'Where to record what you study',
    themeConfig: {
      search: true, // 검색은 사용하지 않는다.
      logo: '', // logo 이미지
      nav: [
        { text: 'Home', link: '/' }, // 상단 메뉴
        { text: 'Repository', link: 'https://github.com/tudiiii/TudyDev/'}
      ],
      sidebar: 'auto', // 사이드바 사용 여부. auto로 하면 content의 내용이 반영된다.
      smoothScroll: true // 부드러운 스크롤 사용 여부
    }
  }