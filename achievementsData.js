// 成就数据定义
const achievements = [
  {
    id: "first_clear",
    name: "初露锋芒",
    description: "完成任意小游戏的第一关。",
    conditionType: "level_cleared_once"
  },
  {
    id: "reading_10",
    name: "故事达人",
    description: "完成故事拼图阅读的10个关卡。",
    conditionType: "reading_cleared_count",
    threshold: 10
  },
  {
    id: "classical_10",
    name: "文言学者",
    description: "完成文言小剧场的10个关卡。",
    conditionType: "classical_cleared_count",
    threshold: 10
  },
  {
    id: "english_10",
    name: "英语小达人",
    description: "完成小书虫闯关的10个关卡。",
    conditionType: "english_cleared_count",
    threshold: 10
  },
  {
    id: "three_games_one_day",
    name: "多面手",
    description: "在同一天玩过3个不同的小游戏。",
    conditionType: "games_played_in_day",
    threshold: 3
  },
  {
    id: "diary_writer",
    name: "日记作家",
    description: "完成英语一句话日记的5个关卡。",
    conditionType: "diary_cleared_count",
    threshold: 5
  },
  {
    id: "logic_master",
    name: "逻辑大师",
    description: "完成逻辑迷宫的10个关卡。",
    conditionType: "logic_cleared_count",
    threshold: 10
  },
  {
    id: "history_buff",
    name: "历史爱好者",
    description: "完成时间线拼图的10个关卡。",
    conditionType: "timeline_cleared_count",
    threshold: 10
  },
  {
    id: "traveler",
    name: "旅行家",
    description: "完成世界小旅行的10个关卡。",
    conditionType: "geo_cleared_count",
    threshold: 10
  },
  {
    id: "all_games",
    name: "全能玩家",
    description: "每个小游戏都至少完成1关。",
    conditionType: "all_games_cleared_once"
  }
];