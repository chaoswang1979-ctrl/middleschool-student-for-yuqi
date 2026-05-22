// 当前游戏类型和关卡索引
let currentGameType = '';
let currentLevelIndex = 0;

// 成就相关变量
let unlockedAchievements = [];
let todayPlayedGames = [];

// 故事拼图阅读变量
let readingShuffledParagraphs = [];
let readingUserAnswers = [];

// 文言小剧场变量
let classicalUserAnswers = [];

// 小书虫闯关变量
let englishUserAnswers = [];

// 英语一句话日记变量
let diarySelectedWords = [];

// 逻辑迷宫变量
let logicSelectedOption = -1;

// 时间线拼图变量
let timelinePlacedEvents = [];
let timelineDraggedCard = null;

// 世界小旅行变量
let geoSelectedOption = -1;

// 页面元素
const homePage = document.getElementById('homePage');
const levelsPage = document.getElementById('levelsPage');
const readingGamePage = document.getElementById('readingGamePage');
const classicalGamePage = document.getElementById('classicalGamePage');
const englishGamePage = document.getElementById('englishGamePage');
const diaryGamePage = document.getElementById('diaryGamePage');
const logicGamePage = document.getElementById('logicGamePage');
const timelineGamePage = document.getElementById('timelineGamePage');
const geoGamePage = document.getElementById('geoGamePage');
const levelsList = document.getElementById('levelsList');
const gameTitle = document.getElementById('gameTitle');

// 故事拼图阅读元素
const readingLevelNum = document.getElementById('readingLevelNum');
const readingStoryTitle = document.getElementById('readingStoryTitle');
const paragraphsContainer = document.getElementById('paragraphsContainer');
const correctStoryArea = document.getElementById('correctStoryArea');
const readingResultMessage = document.getElementById('readingResultMessage');
const correctStory = document.getElementById('correctStory');
const showReadingQuestionsBtn = document.getElementById('showReadingQuestionsBtn');
const readingQuestionsArea = document.getElementById('readingQuestionsArea');
const readingQuestionsContainer = document.getElementById('readingQuestionsContainer');
const submitReadingAnswersBtn = document.getElementById('submitReadingAnswersBtn');
const readingAnswersResult = document.getElementById('readingAnswersResult');

// 文言小剧场元素
const classicalLevelNum = document.getElementById('classicalLevelNum');
const classicalTitle = document.getElementById('classicalTitle');
const classicalItemsContainer = document.getElementById('classicalItemsContainer');
const submitClassicalBtn = document.getElementById('submitClassicalBtn');
const classicalResultArea = document.getElementById('classicalResultArea');
const classicalResultContainer = document.getElementById('classicalResultContainer');

// 小书虫闯关元素
const englishLevelNum = document.getElementById('englishLevelNum');
const englishTitle = document.getElementById('englishTitle');
const englishTextContainer = document.getElementById('englishTextContainer');
const submitEnglishBtn = document.getElementById('submitEnglishBtn');
const englishResultArea = document.getElementById('englishResultArea');
const englishResultText = document.getElementById('englishResultText');

// 英语一句话日记元素
const diaryLevelNum = document.getElementById('diaryLevelNum');
const diaryTitle = document.getElementById('diaryTitle');
const diaryTemplate = document.getElementById('diaryTemplate');
const diaryTextarea = document.getElementById('diaryTextarea');
const diaryWordsContainer = document.getElementById('diaryWordsContainer');
const diarySampleArea = document.getElementById('diarySampleArea');
const diaryCompleteArea = document.getElementById('diaryCompleteArea');

// 逻辑迷宫元素
const logicLevelNum = document.getElementById('logicLevelNum');
const logicTitle = document.getElementById('logicTitle');
const logicDescription = document.getElementById('logicDescription');
const logicOptionsContainer = document.getElementById('logicOptionsContainer');
const submitLogicBtn = document.getElementById('submitLogicBtn');
const logicResultArea = document.getElementById('logicResultArea');
const logicResultContainer = document.getElementById('logicResultContainer');

// 时间线拼图元素
const timelineLevelNum = document.getElementById('timelineLevelNum');
const timelineTitle = document.getElementById('timelineTitle');
const timelineTrack = document.getElementById('timelineTrack');
const timelineCardsContainer = document.getElementById('timelineCardsContainer');
const submitTimelineBtn = document.getElementById('submitTimelineBtn');
const timelineResultArea = document.getElementById('timelineResultArea');
const timelineResultContainer = document.getElementById('timelineResultContainer');

// 世界小旅行元素
const geoLevelNum = document.getElementById('geoLevelNum');
const geoTitle = document.getElementById('geoTitle');
const geoClue = document.getElementById('geoClue');
const geoOptionsContainer = document.getElementById('geoOptionsContainer');
const submitGeoBtn = document.getElementById('submitGeoBtn');
const geoResultArea = document.getElementById('geoResultArea');
const geoResultContainer = document.getElementById('geoResultContainer');

// 游戏名称映射
const gameNames = {
  'reading': '故事拼图阅读',
  'classical': '文言小剧场',
  'english': '小书虫闯关',
  'diary': '英语一句话日记',
  'logic': '逻辑迷宫',
  'timeline': '时间线拼图',
  'geo': '世界小旅行'
};

// 获取通关状态
function getPassedLevels(gameType) {
  const passed = localStorage.getItem(`passedLevels_${gameType}`);
  return passed ? JSON.parse(passed) : [];
}

// 保存通关状态
function savePassedLevel(gameType, levelId) {
  const passed = getPassedLevels(gameType);
  if (!passed.includes(levelId)) {
    passed.push(levelId);
    localStorage.setItem(`passedLevels_${gameType}`, JSON.stringify(passed));
  }
}

// 检查是否已通关
function isLevelPassed(gameType, levelId) {
  return getPassedLevels(gameType).includes(levelId);
}

// 隐藏所有页面
function hideAllPages() {
  homePage.classList.add('hidden');
  levelsPage.classList.add('hidden');
  readingGamePage.classList.add('hidden');
  classicalGamePage.classList.add('hidden');
  englishGamePage.classList.add('hidden');
  diaryGamePage.classList.add('hidden');
  logicGamePage.classList.add('hidden');
  timelineGamePage.classList.add('hidden');
  geoGamePage.classList.add('hidden');
}

// 显示首页
function showHomePage() {
  hideAllPages();
  homePage.classList.remove('hidden');
  renderProgress();
  updateNavButton();
}

// 显示关卡列表页
function showLevelsPage() {
  hideAllPages();
  levelsPage.classList.remove('hidden');
  renderLevelsList();
  updateNavButton();
}

// 显示故事拼图阅读页面
function showReadingGamePage() {
  hideAllPages();
  readingGamePage.classList.remove('hidden');
  updateNavButton();
}

// 显示文言小剧场页面
function showClassicalGamePage() {
  hideAllPages();
  classicalGamePage.classList.remove('hidden');
  updateNavButton();
}

// 显示小书虫闯关页面
function showEnglishGamePage() {
  hideAllPages();
  englishGamePage.classList.remove('hidden');
  updateNavButton();
}

// 显示英语一句话日记页面
function showDiaryGamePage() {
  hideAllPages();
  diaryGamePage.classList.remove('hidden');
  updateNavButton();
}

// 显示逻辑迷宫页面
function showLogicGamePage() {
  hideAllPages();
  logicGamePage.classList.remove('hidden');
  updateNavButton();
}

// 显示时间线拼图页面
function showTimelineGamePage() {
  hideAllPages();
  timelineGamePage.classList.remove('hidden');
  updateNavButton();
}

// 显示世界小旅行页面
function showGeoGamePage() {
  hideAllPages();
  geoGamePage.classList.remove('hidden');
  updateNavButton();
}

// 返回首页
function goBack() {
  showHomePage();
}

// 返回关卡列表
function goBackToLevels() {
  showLevelsPage();
}

// 进入游戏
function goToGame(gameType) {
  currentGameType = gameType;
  showLevelsPage();
}

// 渲染关卡列表
function renderLevelsList() {
  levelsList.innerHTML = '';
  gameTitle.textContent = gameNames[currentGameType];
  
  let levels = [];
  switch (currentGameType) {
    case 'reading':
      levels = readingLevels;
      break;
    case 'classical':
      levels = classicalLevels;
      break;
    case 'english':
      levels = englishReadingLevels;
      break;
    case 'diary':
      levels = englishDiaryLevels;
      break;
    case 'logic':
      levels = logicMazeLevels;
      break;
    case 'timeline':
      levels = timelineLevels;
      break;
    case 'geo':
      levels = geoTravelLevels;
      break;
  }
  
  const passedLevels = getPassedLevels(currentGameType);
  
  levels.forEach((level, index) => {
    const button = document.createElement('button');
    button.className = `level-btn${passedLevels.includes(level.id) ? ' passed' : ''}`;
    button.textContent = level.id;
    button.onclick = () => startLevel(index);
    levelsList.appendChild(button);
  });
}

// 开始关卡
function startLevel(index) {
  currentLevelIndex = index;
  
  switch (currentGameType) {
    case 'reading':
      startReadingLevel(index);
      break;
    case 'classical':
      startClassicalLevel(index);
      break;
    case 'english':
      startEnglishLevel(index);
      break;
    case 'diary':
      startDiaryLevel(index);
      break;
    case 'logic':
      startLogicLevel(index);
      break;
    case 'timeline':
      startTimelineLevel(index);
      break;
    case 'geo':
      startGeoLevel(index);
      break;
  }
}

// ======================= 故事拼图阅读 =======================

// 开始故事拼图阅读关卡
function startReadingLevel(index) {
  const level = readingLevels[index];
  
  readingLevelNum.textContent = level.id;
  readingStoryTitle.textContent = level.title;
  
  readingShuffledParagraphs = [...level.paragraphs].sort(() => Math.random() - 0.5);
  renderReadingParagraphs();
  
  correctStoryArea.classList.add('hidden');
  readingQuestionsArea.classList.add('hidden');
  readingAnswersResult.classList.add('hidden');
  
  showReadingGamePage();
}

// 渲染段落卡片
function renderReadingParagraphs() {
  paragraphsContainer.innerHTML = '';
  
  readingShuffledParagraphs.forEach((paragraph, index) => {
    const card = document.createElement('div');
    card.className = 'paragraph-card';
    card.dataset.id = paragraph.id;
    card.dataset.index = index;
    
    card.innerHTML = `
      <div class="paragraph-number">${index + 1}</div>
      <p class="paragraph-text">${paragraph.text}</p>
    `;
    
    card.draggable = true;
    card.addEventListener('dragstart', handleReadingDragStart);
    card.addEventListener('dragover', handleReadingDragOver);
    card.addEventListener('dragleave', handleReadingDragLeave);
    card.addEventListener('drop', handleReadingDrop);
    
    paragraphsContainer.appendChild(card);
  });
}

// 拖拽相关变量
let readingDraggedElement = null;
let readingDraggedIndex = null;

function handleReadingDragStart(e) {
  readingDraggedElement = e.target.closest('.paragraph-card');
  readingDraggedIndex = parseInt(readingDraggedElement.dataset.index);
  readingDraggedElement.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function handleReadingDragOver(e) {
  e.preventDefault();
  const target = e.target.closest('.paragraph-card');
  if (target) {
    target.classList.add('drag-over');
  }
}

function handleReadingDragLeave(e) {
  const target = e.target.closest('.paragraph-card');
  if (target) {
    target.classList.remove('drag-over');
  }
}

function handleReadingDrop(e) {
  e.preventDefault();
  const dropTarget = e.target.closest('.paragraph-card');
  if (dropTarget) {
    dropTarget.classList.remove('drag-over');
  }
  
  if (dropTarget && dropTarget !== readingDraggedElement) {
    const dropIndex = parseInt(dropTarget.dataset.index);
    
    const temp = readingShuffledParagraphs[readingDraggedIndex];
    readingShuffledParagraphs[readingDraggedIndex] = readingShuffledParagraphs[dropIndex];
    readingShuffledParagraphs[dropIndex] = temp;
    
    renderReadingParagraphs();
  }
  
  if (readingDraggedElement) {
    readingDraggedElement.classList.remove('dragging');
  }
  readingDraggedElement = null;
  readingDraggedIndex = null;
}

// 检查段落顺序
function checkReadingOrder() {
  const level = readingLevels[currentLevelIndex];
  const currentOrder = readingShuffledParagraphs.map(p => p.id);
  const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(level.correctOrder);
  
  readingResultMessage.className = `result-message ${isCorrect ? 'correct' : 'incorrect'}`;
  readingResultMessage.textContent = isCorrect 
    ? '🎉 太棒了！你排对了所有段落的顺序！' 
    : '😅 有些段落的顺序不对，再看看完整的故事吧！';
  
  renderCorrectStory();
  correctStoryArea.classList.remove('hidden');
}

// 渲染正确故事
function renderCorrectStory() {
  const level = readingLevels[currentLevelIndex];
  const orderedParagraphs = level.correctOrder.map(id => 
    level.paragraphs.find(p => p.id === id)
  );
  correctStory.innerHTML = orderedParagraphs.map(p => `<p>${p.text}</p>`).join('');
}

// 显示问题
function showReadingQuestions() {
  const level = readingLevels[currentLevelIndex];
  readingUserAnswers = new Array(level.questions.length).fill(-1);
  
  readingQuestionsContainer.innerHTML = level.questions.map((question, qIndex) => {
    const optionsHTML = question.options.map((option, oIndex) => `
      <label class="option-item" onclick="selectReadingAnswer(${qIndex}, ${oIndex})">
        <input type="radio" name="question-${qIndex}" class="option-radio" ${readingUserAnswers[qIndex] === oIndex ? 'checked' : ''}>
        <span class="option-text">${String.fromCharCode(65 + oIndex)}. ${option}</span>
      </label>
    `).join('');
    
    return `
      <div class="question-item">
        <p class="question-text">${qIndex + 1}. ${question.q}</p>
        <div class="options-list">${optionsHTML}</div>
      </div>
    `;
  }).join('');
  
  readingQuestionsArea.classList.remove('hidden');
  readingAnswersResult.classList.add('hidden');
}

// 选择答案
function selectReadingAnswer(qIndex, oIndex) {
  readingUserAnswers[qIndex] = oIndex;
  const questionItem = readingQuestionsContainer.children[qIndex];
  const options = questionItem.querySelectorAll('.option-item');
  
  options.forEach((opt, idx) => {
    opt.classList.toggle('selected', idx === oIndex);
  });
}

// 检查答案
function checkReadingAnswers() {
  const level = readingLevels[currentLevelIndex];
  let correctCount = 0;
  let totalQuestions = level.questions.length;
  
  level.questions.forEach((question, qIndex) => {
    const questionItem = readingQuestionsContainer.children[qIndex];
    const options = questionItem.querySelectorAll('.option-item');
    
    options.forEach((opt, oIndex) => {
      opt.classList.remove('selected', 'correct', 'incorrect');
      // 提交后才显示正确答案
      if (oIndex === question.answerIndex) {
        opt.classList.add('correct');
      } else if (oIndex === readingUserAnswers[qIndex]) {
        opt.classList.add('incorrect');
      }
    });
    
    if (readingUserAnswers[qIndex] === question.answerIndex) {
      correctCount++;
    }
  });
  
  // 检查是否有下一关
  const hasNextLevel = currentLevelIndex < readingLevels.length - 1;
  
  readingAnswersResult.classList.remove('hidden');
  readingAnswersResult.className = `answers-result ${correctCount === totalQuestions ? 'success' : 'partial'}`;
  readingAnswersResult.innerHTML = `
    <h4>${correctCount === totalQuestions ? '🎉 全部答对了！' : '👍 继续加油！'}</h4>
    <p>你答对了 ${correctCount} 道题，共 ${totalQuestions} 道题</p>
    ${hasNextLevel ? '<button class="next-level-btn" onclick="startReadingLevel(currentLevelIndex + 1)">➡️ 下一关</button>' : '<p>🏆 恭喜你完成了所有关卡！</p>'}
  `;
  
  if (correctCount === totalQuestions) {
    savePassedLevel('reading', level.id);
    checkAchievements('reading', level.id);
  }
}

// ======================= 文言小剧场 =======================

// 开始文言小剧场关卡
function startClassicalLevel(index) {
  const level = classicalLevels[index];
  
  classicalLevelNum.textContent = level.id;
  classicalTitle.textContent = level.title;
  
  classicalUserAnswers = new Array(level.items.length).fill(-1);
  renderClassicalItems();
  
  classicalResultArea.classList.add('hidden');
  
  showClassicalGamePage();
}

// 渲染文言题目
function renderClassicalItems() {
  const level = classicalLevels[currentLevelIndex];
  classicalItemsContainer.innerHTML = '';
  
  level.items.forEach((item, itemIndex) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'classical-item';
    
    const optionsHTML = item.options.map((option, oIndex) => `
      <label class="classical-option" onclick="selectClassicalAnswer(${itemIndex}, ${oIndex})">
        <input type="radio" name="item-${itemIndex}" class="classical-option-radio" ${classicalUserAnswers[itemIndex] === oIndex ? 'checked' : ''}>
        <span class="classical-option-text">${String.fromCharCode(65 + oIndex)}. ${option}</span>
      </label>
    `).join('');
    
    itemDiv.innerHTML = `
      <p class="classical-sentence">"${item.classical}"</p>
      <div class="classical-options">${optionsHTML}</div>
    `;
    
    classicalItemsContainer.appendChild(itemDiv);
  });
}

// 选择文言答案
function selectClassicalAnswer(itemIndex, oIndex) {
  classicalUserAnswers[itemIndex] = oIndex;
  const itemDiv = classicalItemsContainer.children[itemIndex];
  const options = itemDiv.querySelectorAll('.classical-option');
  
  options.forEach((opt, idx) => {
    opt.classList.toggle('selected', idx === oIndex);
  });
}

// 检查文言答案
function checkClassicalAnswers() {
  const level = classicalLevels[currentLevelIndex];
  let correctCount = 0;
  let totalItems = level.items.length;
  
  classicalResultContainer.innerHTML = '';
  
  level.items.forEach((item, itemIndex) => {
    const isCorrect = classicalUserAnswers[itemIndex] === item.answerIndex;
    if (isCorrect) correctCount++;
    
    const resultDiv = document.createElement('div');
    resultDiv.className = 'classical-result-item';
    
    const optionsHTML = item.options.map((option, oIndex) => {
      let className = 'classical-option';
      // 提交后才显示正确答案
      if (oIndex === item.answerIndex) className += ' correct';
      if (oIndex === classicalUserAnswers[itemIndex] && !isCorrect) className += ' incorrect';
      return `
        <label class="${className}">
          <span class="classical-option-text">${String.fromCharCode(65 + oIndex)}. ${option}</span>
        </label>
      `;
    }).join('');
    
    resultDiv.innerHTML = `
      <p class="classical-sentence">"${item.classical}"</p>
      <div class="classical-options">${optionsHTML}</div>
      <div class="classical-result-explanation">
        <strong>${isCorrect ? '✅ 正确！' : '❌ 再想想！'}</strong><br>
        ${item.explanation}
      </div>
    `;
    
    classicalResultContainer.appendChild(resultDiv);
  });
  
  // 检查是否有下一关
  const hasNextLevel = currentLevelIndex < classicalLevels.length - 1;
  
  // 添加下一关按钮
  const nextButton = document.createElement('div');
  nextButton.className = 'classical-next-container';
  nextButton.innerHTML = hasNextLevel ? 
    '<button class="next-level-btn" onclick="startClassicalLevel(currentLevelIndex + 1)">➡️ 下一关</button>' :
    '<p class="classical-completed">🏆 恭喜你完成了所有关卡！</p>';
  classicalResultContainer.appendChild(nextButton);
  
  classicalResultArea.classList.remove('hidden');
  
  if (correctCount === totalItems) {
    savePassedLevel('classical', level.id);
    checkAchievements('classical', level.id);
  }
}

// ======================= 小书虫闯关 =======================

// 开始英语阅读关卡
function startEnglishLevel(index) {
  const level = englishReadingLevels[index];
  
  englishLevelNum.textContent = level.id;
  englishTitle.textContent = level.title;
  
  englishUserAnswers = {};
  level.blanks.forEach(blank => {
    englishUserAnswers[blank.id] = -1;
  });
  
  renderEnglishContent();
  
  englishResultArea.classList.add('hidden');
  
  showEnglishGamePage();
}

// 渲染英语内容
function renderEnglishContent() {
  const level = englishReadingLevels[currentLevelIndex];
  
  let textHTML = '';
  level.textParts.forEach(part => {
    if (part.type === 'text') {
      textHTML += part.value;
    } else {
      textHTML += `<span class="english-blank" data-blank="${part.blankId}">选择</span>`;
    }
  });
  
  let optionsHTML = '';
  level.blanks.forEach((blank, index) => {
    const blankOptionsHTML = blank.options.map((option, oIndex) => `
      <button class="english-blank-btn" onclick="selectEnglishAnswer('${blank.id}', ${oIndex})" data-blank="${blank.id}" data-option="${oIndex}">
        ${option}
      </button>
    `).join('');
    
    optionsHTML += `
      <div class="english-blank-options">
        <div class="english-blank-label">空 ${index + 1}：</div>
        <div class="english-blank-buttons">${blankOptionsHTML}</div>
      </div>
    `;
  });
  
  englishTextContainer.innerHTML = textHTML + optionsHTML;
}

// 选择英语答案
function selectEnglishAnswer(blankId, oIndex) {
  englishUserAnswers[blankId] = oIndex;
  
  const level = englishReadingLevels[currentLevelIndex];
  const blank = level.blanks.find(b => b.id === blankId);
  const selectedWord = blank.options[oIndex];
  
  const blankSpan = englishTextContainer.querySelector(`[data-blank="${blankId}"].english-blank`);
  if (blankSpan) {
    blankSpan.textContent = selectedWord;
  }
  
  const buttons = englishTextContainer.querySelectorAll(`[data-blank="${blankId}"].english-blank-btn`);
  buttons.forEach((btn, idx) => {
    btn.classList.toggle('selected', idx === oIndex);
  });
}

// 检查英语答案
function checkEnglishAnswers() {
  const level = englishReadingLevels[currentLevelIndex];
  let correctCount = 0;
  let totalBlanks = level.blanks.length;
  
  level.blanks.forEach(blank => {
    const isCorrect = englishUserAnswers[blank.id] === blank.answerIndex;
    if (isCorrect) correctCount++;
    
    const blankSpan = englishTextContainer.querySelector(`[data-blank="${blank.id}"].english-blank`);
    const selectedWord = isCorrect ? blank.options[blank.answerIndex] : blank.options[englishUserAnswers[blank.id]];
    
    if (blankSpan) {
      blankSpan.textContent = selectedWord;
      blankSpan.classList.remove('correct', 'incorrect');
      blankSpan.classList.add(isCorrect ? 'correct' : 'incorrect');
    }
    
    const buttons = englishTextContainer.querySelectorAll(`[data-blank="${blank.id}"].english-blank-btn`);
    buttons.forEach((btn, oIndex) => {
      btn.classList.remove('selected', 'correct', 'incorrect');
      // 提交后才显示正确答案
      if (oIndex === blank.answerIndex) btn.classList.add('correct');
      if (oIndex === englishUserAnswers[blank.id] && !isCorrect) btn.classList.add('incorrect');
    });
  });
  
  // 检查是否有下一关
  const hasNextLevel = currentLevelIndex < englishReadingLevels.length - 1;
  
  englishResultText.classList.remove('hidden');
  englishResultText.className = `english-result-text ${correctCount === totalBlanks ? 'success' : 'partial'}`;
  englishResultText.innerHTML = `
    <h4>${correctCount === totalBlanks ? '🎉 全部答对了！' : '👍 继续加油！'}</h4>
    <p>你答对了 ${correctCount} 个空，共 ${totalBlanks} 个空</p>
    ${hasNextLevel ? '<button class="next-level-btn" onclick="startEnglishLevel(currentLevelIndex + 1)">➡️ 下一关</button>' : '<p>🏆 恭喜你完成了所有关卡！</p>'}
  `;
  
  if (correctCount === totalBlanks) {
    savePassedLevel('english', level.id);
    checkAchievements('english', level.id);
  }
}

// ======================= 英语一句话日记 =======================

// 开始英语日记关卡
function startDiaryLevel(index) {
  const level = englishDiaryLevels[index];
  
  diaryLevelNum.textContent = level.id;
  diaryTitle.textContent = level.title;
  
  diaryTemplate.innerHTML = `
    <h3>句型模板：</h3>
    <p>${level.templates.join('<br>')}</p>
  `;
  
  diaryTextarea.value = '';
  
  diaryWordsContainer.innerHTML = level.suggestedWords.map((word, index) => `
    <button class="diary-word-btn" onclick="insertWord('${word}')">${word}</button>
  `).join('');
  
  diarySampleArea.classList.add('hidden');
  diaryCompleteArea.classList.add('hidden');
  
  showDiaryGamePage();
}

// 插入词汇到文本框
function insertWord(word) {
  const textarea = diaryTextarea;
  const cursorPos = textarea.selectionStart;
  const textBefore = textarea.value.substring(0, cursorPos);
  const textAfter = textarea.value.substring(cursorPos);
  
  textarea.value = textBefore + word + textAfter;
  textarea.focus();
  textarea.selectionStart = textarea.selectionEnd = cursorPos + word.length;
}

// 显示示例
function showDiarySample() {
  const level = englishDiaryLevels[currentLevelIndex];
  diarySampleArea.classList.remove('hidden');
  diarySampleArea.innerHTML = `
    <h4>📝 示例日记：</h4>
    <p>${level.sampleSentence}</p>
  `;
}

// 提交日记
function submitDiary() {
  const text = diaryTextarea.value.trim();
  
  if (text.length < 5) {
    alert('请写一些内容后再提交哦！');
    return;
  }
  
  // 检查是否有下一关
  const hasNextLevel = currentLevelIndex < englishDiaryLevels.length - 1;
  
  diaryCompleteArea.classList.remove('hidden');
  diaryCompleteArea.innerHTML = `
    <h3>🎉 Great Job!</h3>
    <p>You wrote an English sentence today!</p>
    <p style="margin-top: 15px; font-style: italic; color: #666;">Your diary: ${text}</p>
    ${hasNextLevel ? '<button class="next-level-btn" onclick="startDiaryLevel(currentLevelIndex + 1)">➡️ 下一关</button>' : '<p>🏆 恭喜你完成了所有关卡！</p>'}
  `;
  
  const level = englishDiaryLevels[currentLevelIndex];
  savePassedLevel('diary', level.id);
  checkAchievements('diary', level.id);
}

// ======================= 逻辑迷宫 =======================

// 开始逻辑迷宫关卡
function startLogicLevel(index) {
  const level = logicMazeLevels[index];
  
  logicLevelNum.textContent = level.id;
  logicTitle.textContent = level.title;
  logicDescription.textContent = level.description;
  
  logicSelectedOption = -1;
  
  logicOptionsContainer.innerHTML = level.options.map((option, index) => `
    <div class="logic-option" onclick="selectLogicOption(${index})">
      <span>${String.fromCharCode(65 + index)}. ${option}</span>
    </div>
  `).join('');
  
  logicResultArea.classList.add('hidden');
  
  showLogicGamePage();
}

// 选择逻辑选项
function selectLogicOption(index) {
  logicSelectedOption = index;
  
  const options = logicOptionsContainer.querySelectorAll('.logic-option');
  options.forEach((opt, idx) => {
    opt.classList.toggle('selected', idx === index);
  });
}

// 检查逻辑答案
function checkLogicAnswer() {
  if (logicSelectedOption === -1) {
    alert('请选择一个答案！');
    return;
  }
  
  const level = logicMazeLevels[currentLevelIndex];
  const isCorrect = logicSelectedOption === level.answerIndex;
  
  const options = logicOptionsContainer.querySelectorAll('.logic-option');
  options.forEach((opt, idx) => {
    opt.classList.remove('selected', 'correct', 'incorrect');
    // 提交后才显示正确答案
    if (idx === level.answerIndex) {
      opt.classList.add('correct');
    } else if (idx === logicSelectedOption && !isCorrect) {
      opt.classList.add('incorrect');
    }
  });
  
  // 检查是否有下一关
  const hasNextLevel = currentLevelIndex < logicMazeLevels.length - 1;
  
  logicResultArea.classList.remove('hidden');
  logicResultContainer.className = `logic-result-container ${isCorrect ? 'correct' : 'incorrect'}`;
  logicResultContainer.innerHTML = `
    <h4>${isCorrect ? '🎉 正确！你真棒！' : '❌ 不对哦，再想想！'}</h4>
    <p>${level.explanation}</p>
    ${hasNextLevel ? '<button class="next-level-btn" onclick="startLogicLevel(currentLevelIndex + 1)">➡️ 下一关</button>' : '<p>🏆 恭喜你完成了所有关卡！</p>'}
  `;
  
  if (isCorrect) {
    savePassedLevel('logic', level.id);
    checkAchievements('logic', level.id);
  }
}

// ======================= 时间线拼图 =======================

// 开始时间线拼图关卡
function startTimelineLevel(index) {
  const level = timelineLevels[index];
  
  timelineLevelNum.textContent = level.id;
  timelineTitle.textContent = level.title;
  
  timelinePlacedEvents = new Array(level.events.length).fill(null);
  
  renderTimelineTrack(level.events.length);
  renderTimelineCards(level.events);
  
  timelineResultArea.classList.add('hidden');
  
  showTimelineGamePage();
}

// 渲染时间线轨道
function renderTimelineTrack(numSlots) {
  timelineTrack.innerHTML = '';
  
  for (let i = 0; i < numSlots; i++) {
    const slot = document.createElement('div');
    slot.className = 'timeline-slot';
    slot.dataset.slot = i;
    slot.textContent = i + 1;
    
    slot.addEventListener('dragover', handleTimelineDragOver);
    slot.addEventListener('dragleave', handleTimelineDragLeave);
    slot.addEventListener('drop', handleTimelineDrop);
    
    timelineTrack.appendChild(slot);
  }
}

// 渲染事件卡片
function renderTimelineCards(events) {
  const shuffledEvents = [...events].sort(() => Math.random() - 0.5);
  
  timelineCardsContainer.innerHTML = '';
  
  shuffledEvents.forEach(event => {
    const card = document.createElement('div');
    card.className = 'timeline-card';
    card.dataset.eventId = event.id;
    card.draggable = true;
    card.textContent = event.name;
    
    card.addEventListener('dragstart', handleTimelineDragStart);
    card.addEventListener('dragend', handleTimelineDragEnd);
    
    timelineCardsContainer.appendChild(card);
  });
}

// 拖拽处理
function handleTimelineDragStart(e) {
  timelineDraggedCard = e.target;
  timelineDraggedCard.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function handleTimelineDragEnd(e) {
  if (timelineDraggedCard) {
    timelineDraggedCard.classList.remove('dragging');
  }
  timelineDraggedCard = null;
  
  document.querySelectorAll('.timeline-slot').forEach(slot => {
    slot.classList.remove('drag-over');
  });
}

function handleTimelineDragOver(e) {
  e.preventDefault();
  const slot = e.target.closest('.timeline-slot');
  if (slot) {
    slot.classList.add('drag-over');
  }
}

function handleTimelineDragLeave(e) {
  const slot = e.target.closest('.timeline-slot');
  if (slot) {
    slot.classList.remove('drag-over');
  }
}

function handleTimelineDrop(e) {
  e.preventDefault();
  const slot = e.target.closest('.timeline-slot');
  if (slot && timelineDraggedCard) {
    slot.classList.remove('drag-over');
    
    const slotIndex = parseInt(slot.dataset.slot);
    const eventId = timelineDraggedCard.dataset.eventId;
    
    // 如果槽位已有卡片，把它放回容器
    if (timelinePlacedEvents[slotIndex]) {
      const existingCard = timelineCardsContainer.querySelector(`[data-event-id="${timelinePlacedEvents[slotIndex].id}"]`);
      if (existingCard) {
        existingCard.classList.remove('placed');
      }
    }
    
    // 把新卡片放到槽位
    timelinePlacedEvents[slotIndex] = { id: eventId, element: timelineDraggedCard };
    timelineDraggedCard.classList.add('placed');
    slot.classList.add('filled');
    slot.textContent = timelineDraggedCard.textContent;
  }
}

// 检查时间线答案
function checkTimelineOrder() {
  const level = timelineLevels[currentLevelIndex];
  
  const userOrder = timelinePlacedEvents.map((placed, index) => {
    if (placed) {
      return placed.id;
    }
    return null;
  }).filter(id => id !== null);
  
  const isCorrect = JSON.stringify(userOrder) === JSON.stringify(level.correctOrder);
  
  // 检查是否有下一关
  const hasNextLevel = currentLevelIndex < timelineLevels.length - 1;
  
  // 显示结果
  timelineResultArea.classList.remove('hidden');
  timelineResultContainer.innerHTML = '';
  
  level.events.forEach((event, index) => {
    const isUserCorrect = userOrder[index] === event.id;
    
    const resultItem = document.createElement('div');
    resultItem.className = `timeline-result-item ${isUserCorrect ? 'correct' : 'incorrect'}`;
    
    resultItem.innerHTML = `
      <div class="timeline-result-order">${index + 1}</div>
      <div class="timeline-result-content">
        <h4>${event.name}</h4>
        <p>${event.intro}</p>
        <span class="year">${event.year < 0 ? '公元前' + Math.abs(event.year) + '年' : '公元' + event.year + '年'}</span>
      </div>
    `;
    
    timelineResultContainer.appendChild(resultItem);
  });
  
  // 添加下一关按钮
  const nextButton = document.createElement('div');
  nextButton.className = 'timeline-next-container';
  nextButton.innerHTML = hasNextLevel ? 
    '<button class="next-level-btn" onclick="startTimelineLevel(currentLevelIndex + 1)">➡️ 下一关</button>' :
    '<p>🏆 恭喜你完成了所有关卡！</p>';
  timelineResultContainer.appendChild(nextButton);
  
  if (isCorrect) {
    savePassedLevel('timeline', level.id);
    checkAchievements('timeline', level.id);
  }
}

// ======================= 世界小旅行 =======================

// 开始世界小旅行关卡
function startGeoLevel(index) {
  const level = geoTravelLevels[index];
  
  geoLevelNum.textContent = level.id;
  geoTitle.textContent = level.title;
  geoClue.textContent = level.clue;
  
  geoSelectedOption = -1;
  
  geoOptionsContainer.innerHTML = level.options.map((option, index) => `
    <div class="geo-option" onclick="selectGeoOption(${index})">
      <span>${String.fromCharCode(65 + index)}. ${option}</span>
    </div>
  `).join('');
  
  geoResultArea.classList.add('hidden');
  
  showGeoGamePage();
}

// 选择地理选项
function selectGeoOption(index) {
  geoSelectedOption = index;
  
  const options = geoOptionsContainer.querySelectorAll('.geo-option');
  options.forEach((opt, idx) => {
    opt.classList.toggle('selected', idx === index);
  });
}

// 检查地理答案
function checkGeoAnswer() {
  if (geoSelectedOption === -1) {
    alert('请选择一个答案！');
    return;
  }
  
  const level = geoTravelLevels[currentLevelIndex];
  const isCorrect = geoSelectedOption === level.answerIndex;
  
  const options = geoOptionsContainer.querySelectorAll('.geo-option');
  options.forEach((opt, idx) => {
    opt.classList.remove('selected', 'correct', 'incorrect');
    // 提交后才显示正确答案
    if (idx === level.answerIndex) {
      opt.classList.add('correct');
    } else if (idx === geoSelectedOption && !isCorrect) {
      opt.classList.add('incorrect');
    }
  });
  
  // 检查是否有下一关
  const hasNextLevel = currentLevelIndex < geoTravelLevels.length - 1;
  
  geoResultArea.classList.remove('hidden');
  geoResultContainer.className = `geo-result-container ${isCorrect ? 'correct' : 'incorrect'}`;
  geoResultContainer.innerHTML = `
    <h4>${isCorrect ? '🎉 正确！你真棒！' : `❌ 不对哦，答案是 ${level.options[level.answerIndex]}！`}</h4>
    <p>${level.intro}</p>
    ${hasNextLevel ? '<button class="next-level-btn" onclick="startGeoLevel(currentLevelIndex + 1)">➡️ 下一关</button>' : '<p>🏆 恭喜你完成了所有关卡！</p>'}
  `;
  
  if (isCorrect) {
    savePassedLevel('geo', level.id);
    checkAchievements('geo', level.id);
  }
}

// ======================= 进度与成就系统 =======================

// 获取游戏进度
function getGameProgress(gameType) {
  const passed = getPassedLevels(gameType);
  const total = getTotalLevels(gameType);
  return { passed: passed.length, total: total };
}

// 获取游戏总关卡数
function getTotalLevels(gameType) {
  switch (gameType) {
    case 'reading': return readingLevels.length;
    case 'classical': return classicalLevels.length;
    case 'english': return englishReadingLevels.length;
    case 'diary': return englishDiaryLevels.length;
    case 'logic': return logicMazeLevels.length;
    case 'timeline': return timelineLevels.length;
    case 'geo': return geoTravelLevels.length;
    default: return 0;
  }
}

// 渲染首页进度
function renderProgress() {
  const progressList = document.getElementById('progressList');
  if (!progressList) return;
  
  progressList.innerHTML = '';
  
  const games = ['reading', 'classical', 'english', 'diary', 'logic', 'timeline', 'geo'];
  
  games.forEach(gameType => {
    const progress = getGameProgress(gameType);
    const item = document.createElement('div');
    item.className = 'progress-item';
    item.innerHTML = `
      <span>${gameNames[gameType]}</span>
      <span>${progress.passed} / ${progress.total}</span>
    `;
    progressList.appendChild(item);
  });
}

// 获取今日玩过的游戏列表
function getTodayPlayedGames() {
  const today = new Date().toDateString();
  const saved = localStorage.getItem('todayPlayedGames');
  const data = saved ? JSON.parse(saved) : {};
  
  if (data.date !== today) {
    return [];
  }
  return data.games || [];
}

// 记录今日玩过的游戏
function recordGamePlayed(gameType) {
  const today = new Date().toDateString();
  let games = getTodayPlayedGames();
  
  if (!games.includes(gameType)) {
    games.push(gameType);
  }
  
  localStorage.setItem('todayPlayedGames', JSON.stringify({
    date: today,
    games: games
  }));
  
  todayPlayedGames = games;
}

// 获取已解锁成就
function getUnlockedAchievements() {
  const saved = localStorage.getItem('unlockedAchievements');
  return saved ? JSON.parse(saved) : [];
}

// 保存解锁成就
function saveUnlockedAchievement(achievementId) {
  unlockedAchievements = getUnlockedAchievements();
  if (!unlockedAchievements.includes(achievementId)) {
    unlockedAchievements.push(achievementId);
    localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
    showAchievementToast(achievementId);
  }
}

// 显示成就解锁提示
function showAchievementToast(achievementId) {
  const achievement = achievements.find(a => a.id === achievementId);
  if (!achievement) return;
  
  const toast = document.getElementById('achievementToast');
  const toastName = document.getElementById('toastAchievementName');
  
  if (toast && toastName) {
    toastName.textContent = achievement.name;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }
}

// 检查成就条件
function checkAchievements(gameType, levelId) {
  // 记录今日玩过的游戏
  recordGamePlayed(gameType);
  
  // 获取当前数据
  const readingProgress = getGameProgress('reading');
  const classicalProgress = getGameProgress('classical');
  const englishProgress = getGameProgress('english');
  const diaryProgress = getGameProgress('diary');
  const logicProgress = getGameProgress('logic');
  const timelineProgress = getGameProgress('timeline');
  const geoProgress = getGameProgress('geo');
  
  // 获取已解锁成就
  unlockedAchievements = getUnlockedAchievements();
  
  // 检查每个成就
  achievements.forEach(achievement => {
    if (unlockedAchievements.includes(achievement.id)) return;
    
    let unlocked = false;
    
    switch (achievement.conditionType) {
      case 'level_cleared_once':
        unlocked = readingProgress.passed > 0 || classicalProgress.passed > 0 || 
                   englishProgress.passed > 0 || diaryProgress.passed > 0 ||
                   logicProgress.passed > 0 || timelineProgress.passed > 0 ||
                   geoProgress.passed > 0;
        break;
        
      case 'reading_cleared_count':
        unlocked = readingProgress.passed >= achievement.threshold;
        break;
        
      case 'classical_cleared_count':
        unlocked = classicalProgress.passed >= achievement.threshold;
        break;
        
      case 'english_cleared_count':
        unlocked = englishProgress.passed >= achievement.threshold;
        break;
        
      case 'diary_cleared_count':
        unlocked = diaryProgress.passed >= achievement.threshold;
        break;
        
      case 'logic_cleared_count':
        unlocked = logicProgress.passed >= achievement.threshold;
        break;
        
      case 'timeline_cleared_count':
        unlocked = timelineProgress.passed >= achievement.threshold;
        break;
        
      case 'geo_cleared_count':
        unlocked = geoProgress.passed >= achievement.threshold;
        break;
        
      case 'games_played_in_day':
        unlocked = todayPlayedGames.length >= achievement.threshold;
        break;
        
      case 'all_games_cleared_once':
        unlocked = readingProgress.passed > 0 && classicalProgress.passed > 0 && 
                   englishProgress.passed > 0 && diaryProgress.passed > 0 &&
                   logicProgress.passed > 0 && timelineProgress.passed > 0 &&
                   geoProgress.passed > 0;
        break;
    }
    
    if (unlocked) {
      saveUnlockedAchievement(achievement.id);
    }
  });
}

// 显示成就面板
function showAchievementsPanel() {
  const panel = document.getElementById('achievementsPanel');
  const list = document.getElementById('achievementsList');
  
  if (!panel || !list) return;
  
  unlockedAchievements = getUnlockedAchievements();
  
  list.innerHTML = '';
  
  achievements.forEach(achievement => {
    const isUnlocked = unlockedAchievements.includes(achievement.id);
    const item = document.createElement('div');
    item.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
    item.innerHTML = `
      <div class="achievement-icon">${isUnlocked ? '🏆' : '🔒'}</div>
      <div class="achievement-info">
        <div class="achievement-name">${achievement.name}</div>
        <div class="achievement-desc">${achievement.description}</div>
      </div>
    `;
    list.appendChild(item);
  });
  
  panel.classList.remove('hidden');
}

// 隐藏成就面板
function hideAchievementsPanel() {
  const panel = document.getElementById('achievementsPanel');
  if (panel) {
    panel.classList.add('hidden');
  }
}

// 重置所有进度
function resetAllProgress() {
  if (confirm('确定要重置所有游戏进度和成就吗？此操作无法撤销！')) {
    // 删除所有游戏的进度数据
    localStorage.removeItem('passedLevels_reading');
    localStorage.removeItem('passedLevels_classical');
    localStorage.removeItem('passedLevels_english');
    localStorage.removeItem('passedLevels_diary');
    localStorage.removeItem('passedLevels_logic');
    localStorage.removeItem('passedLevels_timeline');
    localStorage.removeItem('passedLevels_geo');
    
    // 删除成就数据
    localStorage.removeItem('unlockedAchievements');
    localStorage.removeItem('todayPlayedGames');
    
    // 刷新页面或重新渲染进度
    showHomePage();
    alert('所有进度已重置！');
  }
}

// 更新导航按钮状态
function updateNavButton() {
  const navBackBtn = document.getElementById('navBackBtn');
  if (!navBackBtn) return;
  
  // 在首页隐藏返回按钮，其他页面显示
  const isHome = !homePage.classList.contains('hidden');
  navBackBtn.classList.toggle('hidden', isHome);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  showHomePage();
});