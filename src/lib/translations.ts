import type { Lang } from '@/context/LanguageContext'

export const T: Record<Lang, {
  nav: { about: string; research: string; publications: string; talks: string; contact: string; cv: string }
  about: {
    sectionNum: string; title: string; interests: string; education: string; awards: string
    lifeOutside: string; statusCandidate: string; statusGraduated: string; advisor: string
  }
  research: { sectionNum: string; title: string; subtitle: string; readMore: string; relatedPapers: string; viewAll: string; tagDarkMatter: string; tagEarlyUniverse: string }
  publications: {
    sectionNum: string; title: string; sortLabel: string; yearLabel: string; yearAll: string
    filterAll: string; filterPeerReviewed: string; filterPreprints: string; filterFirstAuthor: string
    sortYearDesc: string; sortYearAsc: string; sortJournalAZ: string; fullLibrary: string
    badgeFirstAuthor: string; badgePreprint: string; viewFull: string
  }
  talks: {
    sectionNum: string; title: string
    legend: { invited: string; seminar: string; poster: string }
    groups: { invitedTalk: string; contributedTalk: string; poster: string }
    badges: { invited: string; seminar: string; poster: string }
  }
  contact: {
    sectionNum: string; title: string; subtitle: string; contactInfo: string; findOnline: string
    labelOffice: string; labelEmail: string; sendEmail: string; footer1: string; footer2: string
    googleScholar: string
  }
}> = {
  en: {
    nav: {
      about: 'About',
      research: 'Research',
      publications: 'Publications',
      talks: 'Talks',
      contact: 'Contact',
      cv: 'CV',
    },
    about: {
      sectionNum: '01 / About',
      title: 'About Me',
      interests: 'Research Interests',
      education: 'Education',
      awards: 'Awards & Fellowships',
      lifeOutside: '📸 Life Outside Research',
      statusCandidate: 'Candidate',
      statusGraduated: 'Graduated',
      advisor: 'Advisor:',
    },
    research: {
      sectionNum: '02 / Research',
      title: 'Research Areas',
      subtitle: 'Bridging particle physics and astrophysics to uncover the nature of dark matter and the first objects in the Universe.',
      readMore: 'Read more',
      relatedPapers: 'Related papers',
      viewAll: 'View all related papers',
      tagDarkMatter: 'Dark Matter',
      tagEarlyUniverse: 'Early Universe',
    },
    publications: {
      sectionNum: '05 / Publications',
      title: 'Publications',
      sortLabel: 'Sort:',
      yearLabel: 'Year:',
      yearAll: 'All',
      filterAll: 'All',
      filterPeerReviewed: 'Peer-Reviewed',
      filterPreprints: 'Preprints',
      filterFirstAuthor: 'First Author',
      sortYearDesc: 'Year ↓',
      sortYearAsc: 'Year ↑',
      sortJournalAZ: 'Journal A–Z',
      fullLibrary: 'Full Library on NASA/ADS',
      badgeFirstAuthor: 'First Author',
      badgePreprint: 'Preprint',
      viewFull: 'View full list on NASA/ADS',
    },
    talks: {
      sectionNum: '06 / Talks',
      title: 'Talks & Presentations',
      legend: { invited: '● Invited', seminar: '○ Contributed/Seminar', poster: '◆ Poster' },
      groups: { invitedTalk: 'Invited Talks', contributedTalk: 'Contributed Talks & Seminars', poster: 'Posters' },
      badges: { invited: '● Invited', seminar: '○ Seminar', poster: '◆ Poster' },
    },
    contact: {
      sectionNum: '07 / Contact',
      title: 'Get in Touch',
      subtitle: 'Happy to discuss science, collaborations, or opportunities. Reach out anytime.',
      contactInfo: 'Contact Info',
      findOnline: 'Find Me Online',
      labelOffice: 'Office',
      labelEmail: 'Email',
      sendEmail: 'Send an Email',
      googleScholar: 'Google Scholar',
      footer1: 'Built with Next.js · Tailwind CSS · Framer Motion',
      footer2: '© 2026 Saiyang Zhang · All rights reserved',
    },
  },
  zh: {
    nav: {
      about: '关于我',
      research: '研究方向',
      publications: '学术成果',
      talks: '学术报告',
      contact: '联系方式',
      cv: '简历',
    },
    about: {
      sectionNum: '01 / 关于',
      title: '关于我',
      interests: '研究兴趣',
      education: '教育经历',
      awards: '奖项与荣誉',
      lifeOutside: '📸 学术之外',
      statusCandidate: '在读',
      statusGraduated: '已毕业',
      advisor: '导师：',
    },
    research: {
      sectionNum: '02 / 研究',
      title: '研究方向',
      subtitle: '连接粒子物理与天体物理，探索暗物质本质与宇宙第一批天体。',
      readMore: '了解更多 →',
      relatedPapers: '相关论文',
      viewAll: '查看所有相关论文',
      tagDarkMatter: '暗物质',
      tagEarlyUniverse: '早期宇宙',
    },
    publications: {
      sectionNum: '05 / 学术成果',
      title: '学术成果',
      sortLabel: '排序：',
      yearLabel: '年份：',
      yearAll: '全部',
      filterAll: '全部',
      filterPeerReviewed: '同行评审',
      filterPreprints: '预印本',
      filterFirstAuthor: '第一作者',
      sortYearDesc: '年份↓',
      sortYearAsc: '年份↑',
      sortJournalAZ: '期刊A–Z',
      fullLibrary: 'NASA/ADS完整论文库',
      badgeFirstAuthor: '第一作者',
      badgePreprint: '预印本',
      viewFull: '在NASA/ADS查看完整列表',
    },
    talks: {
      sectionNum: '06 / 报告',
      title: '学术报告与会议',
      legend: { invited: '● 邀请报告', seminar: '○ 贡献报告/研讨会', poster: '◆ 海报' },
      groups: { invitedTalk: '邀请报告', contributedTalk: '贡献报告', poster: '海报' },
      badges: { invited: '● 邀请', seminar: '○ 研讨会', poster: '◆ 海报' },
    },
    contact: {
      sectionNum: '07 / 联系',
      title: '联系方式',
      subtitle: '欢迎就科研、合作或学术机会与我联系。',
      contactInfo: '联系信息',
      findOnline: '在线主页',
      labelOffice: '办公室',
      labelEmail: '电子邮件',
      sendEmail: '发送邮件',
      googleScholar: '谷歌学术',
      footer1: '使用 Next.js · Tailwind CSS · Framer Motion 构建',
      footer2: '© 2026 张赛旸 · 版权所有',
    },
  },
}
