import type { Lang } from '@/context/LanguageContext'

export const T: Record<Lang, {
  nav: { about: string; research: string; publications: string; talks: string; contact: string; cv: string }
  about: {
    sectionNum: string; title: string; interests: string; education: string; awards: string
    lifeOutside: string; statusCandidate: string; statusGraduated: string; advisor: string
    bioZh: string
    interestLabels: Record<string, string>
    degreeLabels: Record<string, string>
    departmentLabels: Record<string, string>
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
  hero: {
    citaPrefix: string; citaFellow: string; citaAnd: string; citaPostdoc: string
    citaInstitute: string; citaSuffix: string
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
      bioZh: '',
      interestLabels: {},
      degreeLabels: {},
      departmentLabels: {},
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
    // UPDATE 2: Dual fellowship
    hero: {
      citaPrefix: 'Incoming',
      citaFellow: 'CITA Fellow',
      citaAnd: '&',
      citaPostdoc: 'Arts and Science Postdoctoral Fellow',
      citaInstitute: 'University of Toronto',
      citaSuffix: 'Fall 2026',
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
      // UPDATE 3: Natural Chinese bio
      bioZh: '我在北京长大，从小对自然科学和宇宙的奥秘充满好奇。高中毕业后赴美，在柯盖德大学（Colgate University）攻读天文/物理与应用数学，本科毕业后进入德克萨斯大学奥斯汀分校（UT Austin）攻读博士，师从 Volker Bromm 教授，主攻理论与计算天体物理。\n\n目前我是六年级博士候选人，研究方向集中在暗物质与早期宇宙的交叉领域——包括原初黑洞（PBH）、弱相互作用大质量粒子（WIMP）、温暗物质（WDM）和自相互作用暗物质（SIDM）等不同暗物质候选者对早期宇宙天体（第三族星、超大质量黑洞等）的天体物理效应，结合理论建模与大规模数值模拟开展研究。\n\n近年来，我也对机器学习与科学发现的结合愈发感兴趣，特别是将大语言模型（LLM）和基于模拟的推断方法应用于暗物质探测与宇宙学参数估计。\n\n业余时间，我喜欢滑雪、登山、踢球和打网球。目前已登顶科罗拉多四座海拔超过14000英尺的山峰，计划继续挑战更多。',
      // UPDATE 1: Research interest tag translations
      interestLabels: {
        'Dark Matter (PBHs, WIMPs, SIDM)': '暗物质（原初黑洞、WIMP、SIDM）',
        'Early Universe & Pop III Stars': '早期宇宙与第三族星',
        'Supermassive Black Holes': '超大质量黑洞',
        'Large-Scale Structure': '宇宙大尺度结构',
        'High-Performance Computing': '高性能计算',
        'Machine Learning': '机器学习',
      },
      // UPDATE 1: Education degree translations
      degreeLabels: {
        'Ph.D. in Physics': '物理学博士',
        'M.A. in Physics': '物理学硕士',
        'B.A. in Astronomy/Physics & Applied Mathematics': '天文/物理与应用数学学士',
      },
      // UPDATE 1: Department / honour string translations
      departmentLabels: {
        'Magna cum laude': '优等生荣誉',
      },
    },
    research: {
      sectionNum: '02 / 研究',
      title: '研究方向',
      subtitle: '连接粒子物理与天体物理，探索暗物质本质与宇宙第一批天体。',
      readMore: '了解更多 →',
      relatedPapers: '相关论文',
      viewAll: '查看全部相关论文',
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
    // UPDATE 2: Dual fellowship (Chinese)
    hero: {
      citaPrefix: '即将就任',
      citaFellow: 'CITA研究员',
      citaAnd: '暨',
      citaPostdoc: '文理学院博士后研究员',
      citaInstitute: '多伦多大学',
      citaSuffix: '2026年秋',
    },
  },
}
