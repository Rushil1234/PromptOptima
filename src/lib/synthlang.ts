// SynthLang Symbol Mapping
// Inspired by Japanese Kanji - compact symbols for complex concepts
// EXPANDED TO 700+ SYMBOLS including ALL common English words

export interface SymbolMapping {
  symbol: string;
  concept: string;
  description: string;
  category: string;
}

export const SYNTHLANG_SYMBOLS: SymbolMapping[] = [
  // ========== ULTRA COMMON WORDS (100+ symbols) ==========
  // Pronouns & Basic Words
  { symbol: '我', concept: 'I', description: 'I, me, my, mine, myself', category: 'common' },
  { symbol: '汝', concept: 'YOU', description: 'you, your, yours, yourself', category: 'common' },
  { symbol: '彼', concept: 'HE', description: 'he, him, his, himself, she, her, hers, herself', category: 'common' },
  { symbol: '吾', concept: 'WE', description: 'we, us, our, ours, ourselves', category: 'common' },
  { symbol: '達', concept: 'THEY', description: 'they, them, their, theirs, themselves', category: 'common' },
  { symbol: '之', concept: 'IT', description: 'it, its, itself', category: 'common' },
  { symbol: '此', concept: 'THIS', description: 'this, these, here', category: 'common' },
  { symbol: '其', concept: 'THAT', description: 'that, those, there', category: 'common' },
  
  // Common Verbs
  { symbol: '在', concept: 'BE', description: 'is, am, are, was, were, be, being, been', category: 'common' },
  { symbol: '有', concept: 'HAVE', description: 'have, has, had, having', category: 'common' },
  { symbol: '為', concept: 'DO', description: 'do, does, did, doing, done', category: 'common' },
  { symbol: '言', concept: 'SAY', description: 'say, says, said, saying, tell, told', category: 'common' },
  { symbol: '得', concept: 'GET', description: 'get, gets, got, getting, gotten, obtain', category: 'common' },
  { symbol: '作', concept: 'MAKE', description: 'make, makes, made, making, create, build', category: 'common' },
  { symbol: '行', concept: 'GO', description: 'go, goes, went, going, gone', category: 'common' },
  { symbol: '知', concept: 'KNOW', description: 'know, knows, knew, knowing, known', category: 'common' },
  { symbol: '想', concept: 'THINK', description: 'think, thinks, thought, thinking', category: 'common' },
  { symbol: '見', concept: 'SEE', description: 'see, sees, saw, seeing, seen, look, watch', category: 'common' },
  { symbol: '来', concept: 'COME', description: 'come, comes, came, coming', category: 'common' },
  { symbol: '欲', concept: 'WANT', description: 'want, wants, wanted, wanting, wish, desire', category: 'common' },
  { symbol: '用', concept: 'USE', description: 'use, uses, used, using, utilize', category: 'common' },
  { symbol: '尋', concept: 'FIND', description: 'find, finds, found, finding, search', category: 'common' },
  { symbol: '与', concept: 'GIVE', description: 'give, gives, gave, giving, given, provide', category: 'common' },
  { symbol: '告', concept: 'TELL', description: 'tell, tells, told, telling, inform', category: 'common' },
  { symbol: '働', concept: 'WORK', description: 'work, works, worked, working, job', category: 'common' },
  { symbol: '呼', concept: 'CALL', description: 'call, calls, called, calling, invoke', category: 'common' },
  { symbol: '試', concept: 'TRY', description: 'try, tries, tried, trying, attempt', category: 'common' },
  { symbol: '問', concept: 'ASK', description: 'ask, asks, asked, asking, question, query', category: 'common' },
  { symbol: '要', concept: 'NEED', description: 'need, needs, needed, needing, require', category: 'common' },
  { symbol: '感', concept: 'FEEL', description: 'feel, feels, felt, feeling', category: 'common' },
  { symbol: '成', concept: 'BECOME', description: 'become, becomes, became, becoming', category: 'common' },
  { symbol: '離', concept: 'LEAVE', description: 'leave, leaves, left, leaving, exit', category: 'common' },
  { symbol: '置', concept: 'PUT', description: 'put, puts, putting, place, set', category: 'common' },
  { symbol: '意', concept: 'MEAN', description: 'mean, means, meant, meaning, signify', category: 'common' },
  { symbol: '保', concept: 'KEEP', description: 'keep, keeps, kept, keeping, maintain', category: 'common' },
  { symbol: '許', concept: 'LET', description: 'let, lets, letting, allow, permit', category: 'common' },
  { symbol: '始', concept: 'BEGIN', description: 'begin, begins, began, beginning, start', category: 'common' },
  { symbol: '助', concept: 'HELP', description: 'help, helps, helped, helping, assist', category: 'common' },
  { symbol: '話', concept: 'TALK', description: 'talk, talks, talked, talking, speak', category: 'common' },
  { symbol: '転', concept: 'TURN', description: 'turn, turns, turned, turning, rotate', category: 'common' },
  { symbol: '示', concept: 'SHOW', description: 'show, shows, showed, showing, shown, display', category: 'common' },
  { symbol: '聞', concept: 'HEAR', description: 'hear, hears, heard, hearing, listen', category: 'common' },
  { symbol: '遊', concept: 'PLAY', description: 'play, plays, played, playing, game', category: 'common' },
  { symbol: '走', concept: 'RUN', description: 'run, runs, ran, running, execute', category: 'common' },
  { symbol: '動', concept: 'MOVE', description: 'move, moves, moved, moving, motion', category: 'common' },
  { symbol: '住', concept: 'LIVE', description: 'live, lives, lived, living, reside', category: 'common' },
  { symbol: '信', concept: 'BELIEVE', description: 'believe, believes, believed, believing, trust', category: 'common' },
  { symbol: '持', concept: 'HOLD', description: 'hold, holds, held, holding, contain', category: 'common' },
  { symbol: '持', concept: 'BRING', description: 'bring, brings, brought, bringing, carry', category: 'common' },
  { symbol: '書', concept: 'WRITE', description: 'write, writes, wrote, writing, written', category: 'common' },
  { symbol: '座', concept: 'SIT', description: 'sit, sits, sat, sitting, seated', category: 'common' },
  { symbol: '立', concept: 'STAND', description: 'stand, stands, stood, standing', category: 'common' },
  { symbol: '失', concept: 'LOSE', description: 'lose, loses, lost, losing, miss', category: 'common' },
  { symbol: '払', concept: 'PAY', description: 'pay, pays, paid, paying, payment', category: 'common' },
  { symbol: '会', concept: 'MEET', description: 'meet, meets, met, meeting, encounter', category: 'common' },
  { symbol: '含', concept: 'INCLUDE', description: 'include, includes, included, including, contain', category: 'common' },
  { symbol: '続', concept: 'CONTINUE', description: 'continue, continues, continued, continuing, proceed', category: 'common' },
  { symbol: '設', concept: 'SET', description: 'set, sets, setting, configure, establish', category: 'common' },
  { symbol: '学', concept: 'LEARN', description: 'learn, learns, learned, learning, study', category: 'common' },
  { symbol: '変', concept: 'CHANGE', description: 'change, changes, changed, changing, alter', category: 'common' },
  { symbol: '導', concept: 'LEAD', description: 'lead, leads, led, leading, guide', category: 'common' },
  { symbol: '理', concept: 'UNDERSTAND', description: 'understand, understands, understood, understanding, comprehend', category: 'common' },
  { symbol: '停', concept: 'STOP', description: 'stop, stops, stopped, stopping, halt', category: 'common' },
  { symbol: '読', concept: 'READ', description: 'read, reads, reading, load, fetch', category: 'common' },
  { symbol: '増', concept: 'INCREASE', description: 'increase, increases, increased, increasing, grow', category: 'common' },
  
  // Question Words
  { symbol: '如', concept: 'HOW', description: 'how, in what way, by what means', category: 'common' },
  { symbol: '何', concept: 'WHAT', description: 'what, which thing, whatever', category: 'common' },
  { symbol: '時', concept: 'WHEN', description: 'when, at what time, whenever', category: 'common' },
  { symbol: '処', concept: 'WHERE', description: 'where, in what place, wherever', category: 'common' },
  { symbol: '故', concept: 'WHY', description: 'why, for what reason, wherefore', category: 'common' },
  { symbol: '誰', concept: 'WHO', description: 'who, whom, whose, whoever', category: 'common' },
  { symbol: '択', concept: 'WHICH', description: 'which, whichever, what one', category: 'common' },
  
  // Common Adjectives
  { symbol: '良', concept: 'GOOD', description: 'good, well, fine, nice, okay', category: 'common' },
  { symbol: '新', concept: 'NEW', description: 'new, fresh, latest, recent, novel', category: 'common' },
  { symbol: '初', concept: 'FIRST', description: 'first, initial, primary, earliest', category: 'common' },
  { symbol: '終', concept: 'LAST', description: 'last, final, ultimate, latest', category: 'common' },
  { symbol: '長', concept: 'LONG', description: 'long, lengthy, extended, prolonged', category: 'common' },
  { symbol: '大', concept: 'BIG', description: 'big, large, great, huge, major', category: 'common' },
  { symbol: '小', concept: 'SMALL', description: 'small, little, minor, tiny', category: 'common' },
  { symbol: '次', concept: 'NEXT', description: 'next, following, subsequent, upcoming', category: 'common' },
  { symbol: '自', concept: 'OWN', description: 'own, self, personal, private', category: 'common' },
  { symbol: '他', concept: 'OTHER', description: 'other, another, different, else', category: 'common' },
  { symbol: '旧', concept: 'OLD', description: 'old, aged, ancient, former, previous', category: 'common' },
  { symbol: '高', concept: 'HIGH', description: 'high, tall, elevated, upper', category: 'common' },
  { symbol: '全', concept: 'ALL', description: 'all, every, whole, entire, total, complete', category: 'common' },
  { symbol: '毎', concept: 'EACH', description: 'each, every, per, individual', category: 'common' },
  { symbol: '幾', concept: 'SOME', description: 'some, several, certain, few, any', category: 'common' },
  { symbol: '多', concept: 'MANY', description: 'many, much, lots, numerous, plenty', category: 'common' },
  { symbol: '他', concept: 'DIFFERENT', description: 'different, other, distinct, various', category: 'common' },
  { symbol: '可', concept: 'POSSIBLE', description: 'possible, can, able, feasible', category: 'common' },
  { symbol: '能', concept: 'ABLE', description: 'able, capable, can, could, enabled', category: 'common' },
  { symbol: '同', concept: 'SAME', description: 'same, identical, equal, similar', category: 'common' },
  { symbol: '若', concept: 'YOUNG', description: 'young, new, fresh, junior', category: 'common' },
  { symbol: '少', concept: 'FEW', description: 'few, little, small amount, handful', category: 'common' },
  { symbol: '公', concept: 'PUBLIC', description: 'public, open, common, shared', category: 'common' },
  { symbol: '悪', concept: 'BAD', description: 'bad, wrong, poor, evil, negative', category: 'common' },
  { symbol: '早', concept: 'EARLY', description: 'early, soon, quick, prompt', category: 'common' },
  { symbol: '重', concept: 'IMPORTANT', description: 'important, critical, significant, vital, key', category: 'common' },
  
  // Common Prepositions & Conjunctions
  { symbol: '於', concept: 'AT', description: 'at, in, on, by, near', category: 'common' },
  { symbol: '至', concept: 'TO', description: 'to, toward, until, into, onto', category: 'common' },
  { symbol: '自', concept: 'FROM', description: 'from, since, out of, away', category: 'common' },
  { symbol: '共', concept: 'WITH', description: 'with, together, along, including', category: 'common' },
  { symbol: '関', concept: 'ABOUT', description: 'about, regarding, concerning, around', category: 'common' },
  { symbol: '為', concept: 'FOR', description: 'for, to, in order to, because', category: 'common' },
  { symbol: '対', concept: 'AGAINST', description: 'against, versus, opposed, contrary', category: 'common' },
  { symbol: '間', concept: 'BETWEEN', description: 'between, among, amid, within', category: 'common' },
  { symbol: '後', concept: 'AFTER', description: 'after, following, behind, later, post', category: 'common' },
  { symbol: '前', concept: 'BEFORE', description: 'before, prior, earlier, ahead, pre', category: 'common' },
  { symbol: '通', concept: 'THROUGH', description: 'through, via, across, by way of', category: 'common' },
  { symbol: '上', concept: 'OVER', description: 'over, above, on top, beyond', category: 'common' },
  { symbol: '下', concept: 'UNDER', description: 'under, below, beneath, underneath', category: 'common' },
  { symbol: '内', concept: 'IN', description: 'in, inside, within, into', category: 'common' },
  { symbol: '外', concept: 'OUT', description: 'out, outside, external, outer', category: 'common' },
  { symbol: '且', concept: 'AND', description: 'and, also, plus, with, as well', category: 'common' },
  { symbol: '或', concept: 'OR', description: 'or, alternatively, either, else', category: 'common' },
  { symbol: '然', concept: 'BUT', description: 'but, however, yet, though, although', category: 'common' },
  { symbol: '故', concept: 'SO', description: 'so, therefore, thus, hence, then', category: 'common' },
  { symbol: '若', concept: 'IF', description: 'if, whether, in case, when, provided', category: 'common' },
  { symbol: '因', concept: 'BECAUSE', description: 'because, since, as, due to, for', category: 'common' },
  
  // Greetings & Common Phrases
  { symbol: '挨', concept: 'HELLO', description: 'hello, hi, hey, greetings, howdy', category: 'common' },
  { symbol: '謝', concept: 'THANKS', description: 'thanks, thank you, appreciate, grateful', category: 'common' },
  { symbol: '歓', concept: 'WELCOME', description: 'welcome, greetings, hello', category: 'common' },
  { symbol: '済', concept: 'SORRY', description: 'sorry, apologize, excuse, pardon', category: 'common' },
  { symbol: '拝', concept: 'PLEASE', description: 'please, kindly, request', category: 'common' },
  { symbol: '諾', concept: 'YES', description: 'yes, okay, sure, agreed, affirmative', category: 'common' },
  { symbol: '否', concept: 'NO', description: 'no, not, nope, negative, refuse', category: 'common' },
  { symbol: '別', concept: 'GOODBYE', description: 'goodbye, bye, farewell, see you', category: 'common' },
  
  // ========== CORE ACTIONS (100+ symbols) ==========
  // CRUD Operations
  { symbol: '作', concept: 'CREATE', description: 'Generate, create, make, build, produce, construct, develop, establish, initialize', category: 'action' },
  { symbol: '読', concept: 'READ', description: 'Read, load, retrieve, fetch, get, access, view, display, show', category: 'action' },
  { symbol: '更', concept: 'UPDATE', description: 'Update, modify, change, edit, revise, refresh, patch, alter', category: 'action' },
  { symbol: '削', concept: 'DELETE', description: 'Remove, delete, eliminate, erase, clear, destroy, drop', category: 'action' },
  
  // Data Operations
  { symbol: '書', concept: 'WRITE', description: 'Write, save, store, record, output, persist, commit', category: 'action' },
  { symbol: '複', concept: 'COPY', description: 'Copy, duplicate, clone, replicate, backup', category: 'action' },
  { symbol: '移', concept: 'MOVE', description: 'Move, transfer, migrate, relocate, shift', category: 'action' },
  { symbol: '結', concept: 'MERGE', description: 'Merge, combine, join, unite, concatenate, blend', category: 'action' },
  { symbol: '分', concept: 'SPLIT', description: 'Split, divide, separate, partition, break', category: 'action' },
  { symbol: '抽', concept: 'EXTRACT', description: 'Extract, pull, retrieve, isolate, parse', category: 'action' },
  { symbol: '挿', concept: 'INSERT', description: 'Insert, add, append, push, inject, place', category: 'action' },
  { symbol: '置', concept: 'REPLACE', description: 'Replace, substitute, swap, override, supersede', category: 'action' },
  
  // Transform Operations
  { symbol: '変', concept: 'TRANSFORM', description: 'Convert, change, transform, modify, alter, adjust, adapt', category: 'action' },
  { symbol: '換', concept: 'CONVERT', description: 'Convert, translate, encode, decode, transcode', category: 'action' },
  { symbol: '圧', concept: 'COMPRESS', description: 'Compress, compact, zip, shrink, minimize', category: 'action' },
  { symbol: '展', concept: 'EXPAND', description: 'Expand, decompress, unzip, inflate, extend', category: 'action' },
  { symbol: '正', concept: 'NORMALIZE', description: 'Normalize, standardize, regularize, clean', category: 'action' },
  { symbol: '暗', concept: 'ENCRYPT', description: 'Encrypt, encode, cipher, secure, protect', category: 'action' },
  { symbol: '復', concept: 'DECRYPT', description: 'Decrypt, decode, decipher, unlock', category: 'action' },
  
  // Analysis Operations  
  { symbol: '析', concept: 'ANALYZE', description: 'Examine, study, analyze, investigate, research, review, inspect', category: 'action' },
  { symbol: '検', concept: 'VALIDATE', description: 'Validate, verify, check, confirm, test, audit', category: 'action' },
  { symbol: '試', concept: 'TEST', description: 'Test, try, experiment, probe, evaluate', category: 'action' },
  { symbol: '測', concept: 'MEASURE', description: 'Measure, gauge, quantify, assess, benchmark', category: 'action' },
  { symbol: '監', concept: 'MONITOR', description: 'Monitor, watch, track, observe, supervise', category: 'action' },
  { symbol: '記', concept: 'LOG', description: 'Log, record, trace, audit, chronicle', category: 'action' },
  { symbol: '報', concept: 'REPORT', description: 'Report, notify, alert, inform, announce', category: 'action' },
  
  // Search & Query
  { symbol: '探', concept: 'SEARCH', description: 'Search, find, lookup, query, seek, hunt', category: 'action' },
  { symbol: '選', concept: 'FILTER', description: 'Filter, select, choose, pick, find, screen', category: 'action' },
  { symbol: '順', concept: 'SORT', description: 'Sort, order, arrange, organize, rank, prioritize', category: 'action' },
  { symbol: '群', concept: 'GROUP', description: 'Group, cluster, aggregate, categorize, collect', category: 'action' },
  { symbol: '索', concept: 'INDEX', description: 'Index, catalog, list, enumerate, register', category: 'action' },
  
  // Computation
  { symbol: '計', concept: 'CALCULATE', description: 'Calculate, compute, count, total, sum', category: 'action' },
  { symbol: '算', concept: 'COMPUTE', description: 'Compute, process, evaluate, execute, run', category: 'action' },
  { symbol: '増', concept: 'INCREMENT', description: 'Increment, increase, add, augment, boost', category: 'action' },
  { symbol: '減', concept: 'DECREMENT', description: 'Decrement, decrease, subtract, reduce, lower', category: 'action' },
  { symbol: '乗', concept: 'MULTIPLY', description: 'Multiply, times, scale, amplify', category: 'action' },
  { symbol: '割', concept: 'DIVIDE', description: 'Divide, split, partition, separate', category: 'action' },
  
  // Communication
  { symbol: '送', concept: 'SEND', description: 'Send, transmit, post, submit, deliver, dispatch, emit', category: 'action' },
  { symbol: '受', concept: 'RECEIVE', description: 'Receive, get, accept, obtain, acquire', category: 'action' },
  { symbol: '要', concept: 'REQUEST', description: 'Request, ask, demand, query, call, invoke', category: 'action' },
  { symbol: '応', concept: 'RESPOND', description: 'Respond, reply, answer, return, acknowledge', category: 'action' },
  { symbol: '通', concept: 'NOTIFY', description: 'Notify, alert, inform, message, broadcast', category: 'action' },
  { symbol: '購', concept: 'SUBSCRIBE', description: 'Subscribe, follow, register, enroll, listen', category: 'action' },
  { symbol: '配', concept: 'PUBLISH', description: 'Publish, broadcast, distribute, release, emit', category: 'action' },
  
  // State Management
  { symbol: '開', concept: 'OPEN', description: 'Open, start, begin, launch, initialize, activate', category: 'action' },
  { symbol: '閉', concept: 'CLOSE', description: 'Close, end, stop, terminate, shutdown, deactivate', category: 'action' },
  { symbol: '起', concept: 'START', description: 'Start, begin, initiate, launch, boot, trigger', category: 'action' },
  { symbol: '止', concept: 'STOP', description: 'Stop, halt, pause, suspend, abort, kill', category: 'action' },
  { symbol: '続', concept: 'CONTINUE', description: 'Continue, resume, proceed, persist, carry on', category: 'action' },
  { symbol: '待', concept: 'WAIT', description: 'Wait, pause, delay, hold, sleep, idle', category: 'action' },
  { symbol: '再', concept: 'RETRY', description: 'Retry, repeat, redo, restart, reattempt', category: 'action' },
  { symbol: '取', concept: 'CANCEL', description: 'Cancel, abort, revoke, undo, rollback', category: 'action' },
  
  // Rendering & Display
  { symbol: '描', concept: 'RENDER', description: 'Render, draw, display, show, visualize, paint', category: 'action' },
  { symbol: '表', concept: 'DISPLAY', description: 'Display, show, present, exhibit, reveal', category: 'action' },
  { symbol: '隠', concept: 'HIDE', description: 'Hide, conceal, mask, suppress, obscure', category: 'action' },
  { symbol: '印', concept: 'PRINT', description: 'Print, output, echo, dump, log', category: 'action' },
  
  // Import/Export
  { symbol: '入', concept: 'IMPORT', description: 'Import, load, include, require, bring in', category: 'action' },
  { symbol: '出', concept: 'EXPORT', description: 'Export, output, save, extract, emit', category: 'action' },
  { symbol: '解', concept: 'PARSE', description: 'Parse, analyze, interpret, decode, process', category: 'action' },
  { symbol: '構', concept: 'BUILD', description: 'Build, compile, assemble, construct, package', category: 'action' },
  { symbol: '配', concept: 'DEPLOY', description: 'Deploy, release, publish, install, distribute', category: 'action' },
  
  // ========== DATA TYPES (80+ symbols) ==========
  // Primitive Types
  { symbol: '文', concept: 'STRING', description: 'Text, string, content, document, message, char', category: 'type' },
  { symbol: '数', concept: 'NUMBER', description: 'Number, integer, value, count, quantity, digit', category: 'type' },
  { symbol: '真', concept: 'BOOLEAN', description: 'True, false, boolean, binary, flag, bit', category: 'type' },
  { symbol: '空', concept: 'NULL', description: 'Null, none, empty, void, nil, undefined', category: 'type' },
  { symbol: '浮', concept: 'FLOAT', description: 'Float, decimal, double, real number', category: 'type' },
  { symbol: '整', concept: 'INTEGER', description: 'Integer, int, whole number, long', category: 'type' },
  { symbol: '字', concept: 'CHAR', description: 'Character, char, letter, symbol', category: 'type' },
  { symbol: '節', concept: 'BYTE', description: 'Byte, bit, binary, octet', category: 'type' },
  
  // Collections
  { symbol: '配', concept: 'ARRAY', description: 'Array, list, sequence, vector, collection', category: 'type' },
  { symbol: '辞', concept: 'DICTIONARY', description: 'Dictionary, map, hash, object, associative array', category: 'type' },
  { symbol: '集', concept: 'SET', description: 'Set, collection, group, ensemble, unique list', category: 'type' },
  { symbol: '列', concept: 'QUEUE', description: 'Queue, line, buffer, fifo, stream', category: 'type' },
  { symbol: '積', concept: 'STACK', description: 'Stack, pile, lifo, backlog', category: 'type' },
  { symbol: '木', concept: 'TREE', description: 'Tree, hierarchy, structure, graph', category: 'type' },
  { symbol: '図', concept: 'GRAPH', description: 'Graph, network, diagram, chart', category: 'type' },
  { symbol: '対', concept: 'PAIR', description: 'Pair, tuple, couple, duo, key-value', category: 'type' },
  
  // Complex Types
  { symbol: '物', concept: 'OBJECT', description: 'Object, structure, entity, item, thing, instance', category: 'type' },
  { symbol: '類', concept: 'CLASS', description: 'Class, type, category, kind, structure, template', category: 'type' },
  { symbol: '構', concept: 'STRUCT', description: 'Struct, structure, record, compound type', category: 'type' },
  { symbol: '列', concept: 'ENUM', description: 'Enum, enumeration, choice, option set', category: 'type' },
  { symbol: '型', concept: 'TYPE', description: 'Type, datatype, format, kind, category', category: 'type' },
  { symbol: '汎', concept: 'GENERIC', description: 'Generic, template, parameterized type', category: 'type' },
  
  // Special Types
  { symbol: '日', concept: 'DATE', description: 'Date, day, calendar, timestamp', category: 'type' },
  { symbol: '時', concept: 'TIME', description: 'Time, clock, hour, moment, timestamp', category: 'type' },
  { symbol: '期', concept: 'DATETIME', description: 'Datetime, timestamp, moment, instant', category: 'type' },
  { symbol: '範', concept: 'RANGE', description: 'Range, interval, span, scope, bounds', category: 'type' },
  { symbol: '正', concept: 'REGEX', description: 'Regex, pattern, expression, match', category: 'type' },
  { symbol: '流', concept: 'STREAM', description: 'Stream, flow, channel, pipe, buffer', category: 'type' },
  { symbol: '約', concept: 'PROMISE', description: 'Promise, future, async, deferred', category: 'type' },
  { symbol: '誤', concept: 'ERROR', description: 'Error, exception, problem, issue, bug, fault', category: 'type' },
  
  // File & Media Types
  { symbol: '簿', concept: 'FILE', description: 'File, document, attachment, resource', category: 'type' },
  { symbol: '録', concept: 'RECORD', description: 'Record, entry, row, tuple, document', category: 'type' },
  { symbol: '画', concept: 'IMAGE', description: 'Image, picture, photo, graphic, icon', category: 'type' },
  { symbol: '音', concept: 'AUDIO', description: 'Audio, sound, music, voice, recording', category: 'type' },
  { symbol: '映', concept: 'VIDEO', description: 'Video, movie, clip, recording, film', category: 'type' },
  { symbol: 'JSON', concept: 'JSON', description: 'JSON, javascript object notation, data format', category: 'type' },
  { symbol: 'XML', concept: 'XML', description: 'XML, markup, extensible markup language', category: 'type' },
  { symbol: 'CSV', concept: 'CSV', description: 'CSV, comma-separated values, spreadsheet', category: 'type' },
  
  // ========== MODIFIERS & QUANTIFIERS (60+ symbols) ==========
  // Presence
  { symbol: '有', concept: 'WITH', description: 'Including, with, containing, having, plus', category: 'modifier' },
  { symbol: '無', concept: 'WITHOUT', description: 'Excluding, without, omitting, lacking, minus', category: 'modifier' },
  
  // Quantity
  { symbol: '全', concept: 'ALL', description: 'All, every, complete, entire, total, whole', category: 'quantifier' },
  { symbol: '各', concept: 'EACH', description: 'Each, every, individual, per, apiece', category: 'quantifier' },
  { symbol: '幾', concept: 'SOME', description: 'Some, several, certain, few, any', category: 'quantifier' },
  { symbol: '何', concept: 'ANY', description: 'Any, whatever, whichever, arbitrary', category: 'quantifier' },
  { symbol: '零', concept: 'NONE', description: 'None, nothing, zero, empty, null', category: 'quantifier' },
  { symbol: '単', concept: 'SINGLE', description: 'Single, one, unique, individual, sole, singular', category: 'quantifier' },
  { symbol: '多', concept: 'MULTIPLE', description: 'Multiple, many, several, numerous, plural', category: 'quantifier' },
  { symbol: '少', concept: 'FEW', description: 'Few, some, several, little, handful', category: 'quantifier' },
  { symbol: '大', concept: 'MANY', description: 'Many, lots, numerous, plenty, abundant', category: 'quantifier' },
  { symbol: '最', concept: 'MOST', description: 'Most, maximum, greatest, majority', category: 'quantifier' },
  { symbol: '初', concept: 'FIRST', description: 'First, initial, start, beginning, primary', category: 'quantifier' },
  { symbol: '終', concept: 'LAST', description: 'Last, final, end, conclusion, ultimate', category: 'quantifier' },
  { symbol: '次', concept: 'NEXT', description: 'Next, following, subsequent, upcoming', category: 'quantifier' },
  
  // Size
  { symbol: '巨', concept: 'LARGE', description: 'Large, big, major, great, huge, massive', category: 'modifier' },
  { symbol: '小', concept: 'SMALL', description: 'Small, little, minor, tiny, compact', category: 'modifier' },
  { symbol: '長', concept: 'LONG', description: 'Long, extended, lengthy, prolonged', category: 'modifier' },
  { symbol: '短', concept: 'SHORT', description: 'Short, brief, concise, quick', category: 'modifier' },
  { symbol: '高', concept: 'HIGH', description: 'High, tall, elevated, upper, top', category: 'modifier' },
  { symbol: '低', concept: 'LOW', description: 'Low, short, bottom, minimal, base', category: 'modifier' },
  { symbol: '深', concept: 'DEEP', description: 'Deep, profound, nested, recursive', category: 'modifier' },
  { symbol: '浅', concept: 'SHALLOW', description: 'Shallow, surface, superficial, flat', category: 'modifier' },
  
  // State
  { symbol: '新', concept: 'NEW', description: 'New, fresh, latest, recent, novel', category: 'modifier' },
  { symbol: '旧', concept: 'OLD', description: 'Old, previous, former, past, legacy', category: 'modifier' },
  { symbol: '活', concept: 'ACTIVE', description: 'Active, live, running, enabled, online', category: 'modifier' },
  { symbol: '休', concept: 'INACTIVE', description: 'Inactive, idle, dormant, offline, disabled', category: 'modifier' },
  { symbol: '永', concept: 'PERMANENT', description: 'Permanent, persistent, lasting, eternal', category: 'modifier' },
  { symbol: '仮', concept: 'TEMPORARY', description: 'Temporary, temp, transient, ephemeral', category: 'modifier' },
  { symbol: '公', concept: 'PUBLIC', description: 'Public, open, shared, visible, external', category: 'modifier' },
  { symbol: '私', concept: 'PRIVATE', description: 'Private, hidden, internal, protected', category: 'modifier' },
  { symbol: '静', concept: 'STATIC', description: 'Static, fixed, constant, unchanging', category: 'modifier' },
  { symbol: '動', concept: 'DYNAMIC', description: 'Dynamic, changing, variable, flexible', category: 'modifier' },
  
  // Quality
  { symbol: '良', concept: 'GOOD', description: 'Good, valid, correct, proper, right', category: 'modifier' },
  { symbol: '悪', concept: 'BAD', description: 'Bad, invalid, wrong, incorrect, poor', category: 'modifier' },
  { symbol: '快', concept: 'FAST', description: 'Fast, quick, rapid, speedy, swift', category: 'modifier' },
  { symbol: '遅', concept: 'SLOW', description: 'Slow, delayed, lagging, sluggish', category: 'modifier' },
  { symbol: '強', concept: 'STRONG', description: 'Strong, powerful, robust, solid', category: 'modifier' },
  { symbol: '弱', concept: 'WEAK', description: 'Weak, fragile, vulnerable, soft', category: 'modifier' },
  { symbol: '厳', concept: 'STRICT', description: 'Strict, rigid, exact, precise', category: 'modifier' },
  { symbol: '緩', concept: 'LOOSE', description: 'Loose, relaxed, flexible, lenient', category: 'modifier' },
  
  // ========== LOGIC & CONTROL FLOW (40+ symbols) ==========
  // Boolean Logic
  { symbol: '且', concept: 'AND', description: 'And, also, plus, in addition, conjunction', category: 'logic' },
  { symbol: '或', concept: 'OR', description: 'Or, alternatively, either, disjunction', category: 'logic' },
  { symbol: '非', concept: 'NOT', description: 'Not, negation, opposite, inverse, complement', category: 'logic' },
  { symbol: '排', concept: 'XOR', description: 'Xor, exclusive or, either but not both', category: 'logic' },
  { symbol: '等', concept: 'EQUAL', description: 'Equal, same, identical, equivalent, matches', category: 'logic' },
  { symbol: '異', concept: 'NOTEQUAL', description: 'Not equal, different, distinct, unequal', category: 'logic' },
  { symbol: '超', concept: 'GREATER', description: 'Greater, larger, more, exceeds, above', category: 'logic' },
  { symbol: '未', concept: 'LESS', description: 'Less, smaller, fewer, below, under', category: 'logic' },
  
  // Conditionals
  { symbol: '条', concept: 'IF', description: 'If, condition, when, in case, provided', category: 'logic' },
  { symbol: '他', concept: 'ELSE', description: 'Else, otherwise, alternatively, or', category: 'logic' },
  { symbol: '故', concept: 'THEN', description: 'Then, therefore, result, output, so, consequently', category: 'logic' },
  { symbol: '場', concept: 'SWITCH', description: 'Switch, case, choice, select, branch', category: 'logic' },
  { symbol: '既', concept: 'DEFAULT', description: 'Default, fallback, standard, normal', category: 'logic' },
  
  // Loops
  { symbol: '回', concept: 'LOOP', description: 'Loop, iterate, repeat, cycle, while', category: 'logic' },
  { symbol: '毎', concept: 'FOREACH', description: 'Foreach, for each, iterate, map over', category: 'logic' },
  { symbol: '迄', concept: 'UNTIL', description: 'Until, till, up to, before, while not', category: 'logic' },
  { symbol: '間', concept: 'WHILE', description: 'While, during, throughout, as long as', category: 'logic' },
  { symbol: '抜', concept: 'BREAK', description: 'Break, exit, escape, stop loop, terminate', category: 'logic' },
  { symbol: '跳', concept: 'CONTINUE', description: 'Continue, skip, next, proceed, jump', category: 'logic' },
  { symbol: '戻', concept: 'RETURN', description: 'Return, give back, yield, output, result', category: 'logic' },
  
  // Exception Handling
  { symbol: '試', concept: 'TRY', description: 'Try, attempt, test, experiment, catch', category: 'logic' },
  { symbol: '捕', concept: 'CATCH', description: 'Catch, handle, trap, intercept, rescue', category: 'logic' },
  { symbol: '投', concept: 'THROW', description: 'Throw, raise, emit, trigger, signal', category: 'logic' },
  { symbol: '最', concept: 'FINALLY', description: 'Finally, always, cleanup, ensure', category: 'logic' },
  
  // ========== SYSTEM & INFRASTRUCTURE (80+ symbols) ==========
  // Database
  { symbol: '庫', concept: 'DATABASE', description: 'Database, storage, data, repository, db', category: 'infrastructure' },
  { symbol: '表', concept: 'TABLE', description: 'Table, relation, dataset, collection', category: 'infrastructure' },
  { symbol: '欄', concept: 'COLUMN', description: 'Column, field, attribute, property', category: 'infrastructure' },
  { symbol: '行', concept: 'ROW', description: 'Row, record, entry, tuple, document', category: 'infrastructure' },
  { symbol: '鍵', concept: 'KEY', description: 'Key, identifier, index, primary key, id', category: 'infrastructure' },
  { symbol: '値', concept: 'VALUE', description: 'Value, data, content, payload, body', category: 'infrastructure' },
  { symbol: '索', concept: 'INDEX', description: 'Index, key, lookup, reference, pointer', category: 'infrastructure' },
  { symbol: '問', concept: 'QUERY', description: 'Query, search, select, find, request', category: 'infrastructure' },
  { symbol: '交', concept: 'TRANSACTION', description: 'Transaction, operation, atomic unit', category: 'infrastructure' },
  { symbol: '備', concept: 'BACKUP', description: 'Backup, copy, snapshot, archive, save', category: 'infrastructure' },
  
  // Network & API
  { symbol: '網', concept: 'NETWORK', description: 'Network, internet, connection, web', category: 'infrastructure' },
  { symbol: '接', concept: 'API', description: 'API, interface, endpoint, connection, service', category: 'infrastructure' },
  { symbol: '点', concept: 'ENDPOINT', description: 'Endpoint, url, route, path, resource', category: 'infrastructure' },
  { symbol: '路', concept: 'ROUTE', description: 'Route, path, url, endpoint, mapping', category: 'infrastructure' },
  { symbol: '求', concept: 'REQUEST', description: 'Request, call, query, ask, invoke', category: 'infrastructure' },
  { symbol: '答', concept: 'RESPONSE', description: 'Response, reply, result, answer, output', category: 'infrastructure' },
  { symbol: '頭', concept: 'HEADER', description: 'Header, metadata, top, title, label', category: 'infrastructure' },
  { symbol: '体', concept: 'BODY', description: 'Body, content, payload, data, message', category: 'infrastructure' },
  { symbol: '状', concept: 'STATUS', description: 'Status, state, condition, code, response', category: 'infrastructure' },
  { symbol: '認', concept: 'AUTH', description: 'Auth, authentication, login, identity, security', category: 'infrastructure' },
  { symbol: '令', concept: 'TOKEN', description: 'Token, credential, key, session, ticket', category: 'infrastructure' },
  { symbol: '会', concept: 'SESSION', description: 'Session, connection, context, state', category: 'infrastructure' },
  { symbol: '餅', concept: 'COOKIE', description: 'Cookie, stored data, browser storage', category: 'infrastructure' },
  { symbol: '蔵', concept: 'CACHE', description: 'Cache, buffer, temp storage, memory', category: 'infrastructure' },
  
  // Server & Hosting
  { symbol: '器', concept: 'SERVER', description: 'Server, host, backend, service, node', category: 'infrastructure' },
  { symbol: '客', concept: 'CLIENT', description: 'Client, frontend, user agent, consumer', category: 'infrastructure' },
  { symbol: '主', concept: 'HOST', description: 'Host, server, machine, computer, node', category: 'infrastructure' },
  { symbol: '港', concept: 'PORT', description: 'Port, socket, address, channel, number', category: 'infrastructure' },
  { symbol: '域', concept: 'DOMAIN', description: 'Domain, hostname, url, address, website', category: 'infrastructure' },
  { symbol: 'IP', concept: 'IP', description: 'IP, address, internet protocol, location', category: 'infrastructure' },
  { symbol: 'URL', concept: 'URL', description: 'URL, link, address, path, resource', category: 'infrastructure' },
  { symbol: 'DNS', concept: 'DNS', description: 'DNS, domain name system, resolver', category: 'infrastructure' },
  { symbol: '負', concept: 'LOAD', description: 'Load, traffic, workload, capacity, burden', category: 'infrastructure' },
  { symbol: '均', concept: 'BALANCE', description: 'Balance, distribute, loadbalance, spread', category: 'infrastructure' },
  
  // Security
  { symbol: '守', concept: 'PROTECT', description: 'Protect, secure, guard, shield, defend', category: 'infrastructure' },
  { symbol: '攻', concept: 'ATTACK', description: 'Attack, hack, breach, exploit, threat', category: 'infrastructure' },
  { symbol: '防', concept: 'DEFEND', description: 'Defend, block, prevent, filter, firewall', category: 'infrastructure' },
  { symbol: '壁', concept: 'FIREWALL', description: 'Firewall, barrier, protection, filter', category: 'infrastructure' },
  { symbol: '署', concept: 'SIGNATURE', description: 'Signature, sign, seal, hash, verify', category: 'infrastructure' },
  { symbol: '証', concept: 'CERTIFICATE', description: 'Certificate, cert, credential, license', category: 'infrastructure' },
  { symbol: 'SSL', concept: 'SSL', description: 'SSL, TLS, encryption, secure connection', category: 'infrastructure' },
  
  // Storage
  { symbol: '倉', concept: 'STORAGE', description: 'Storage, disk, memory, warehouse, space', category: 'infrastructure' },
  { symbol: '盤', concept: 'DISK', description: 'Disk, drive, volume, storage, media', category: 'infrastructure' },
  { symbol: '憶', concept: 'MEMORY', description: 'Memory, RAM, cache, buffer, storage', category: 'infrastructure' },
  { symbol: '雲', concept: 'CLOUD', description: 'Cloud, remote, hosted, saas, platform', category: 'infrastructure' },
  { symbol: '桶', concept: 'BUCKET', description: 'Bucket, container, storage, s3, blob', category: 'infrastructure' },
  
  // ========== PROGRAMMING CONCEPTS (60+ symbols) ==========
  // Functions & Methods
  { symbol: '関', concept: 'FUNCTION', description: 'Function, method, procedure, operation, routine', category: 'programming' },
  { symbol: '法', concept: 'METHOD', description: 'Method, function, procedure, operation', category: 'programming' },
  { symbol: '引', concept: 'PARAMETER', description: 'Parameter, argument, input, param, arg', category: 'programming' },
  { symbol: '戻', concept: 'RETURN', description: 'Return, output, result, yield, give back', category: 'programming' },
  { symbol: '呼', concept: 'CALL', description: 'Call, invoke, execute, run, trigger', category: 'programming' },
  { symbol: '帰', concept: 'CALLBACK', description: 'Callback, handler, listener, hook', category: 'programming' },
  
  // OOP
  { symbol: '類', concept: 'CLASS', description: 'Class, type, category, kind, structure, template', category: 'programming' },
  { symbol: '例', concept: 'INSTANCE', description: 'Instance, object, example, occurrence', category: 'programming' },
  { symbol: '継', concept: 'INHERIT', description: 'Inherit, extend, derive, subclass', category: 'programming' },
  { symbol: '面', concept: 'INTERFACE', description: 'Interface, contract, protocol, api', category: 'programming' },
  { symbol: '実', concept: 'IMPLEMENT', description: 'Implement, realize, fulfill, execute', category: 'programming' },
  { symbol: '抽', concept: 'ABSTRACT', description: 'Abstract, generic, template, base', category: 'programming' },
  { symbol: '封', concept: 'ENCAPSULATE', description: 'Encapsulate, wrap, hide, package', category: 'programming' },
  { symbol: '多', concept: 'POLYMORPHIC', description: 'Polymorphic, flexible, adaptable', category: 'programming' },
  
  // Variables & Constants
  { symbol: '変', concept: 'VARIABLE', description: 'Variable, var, let, mutable, changeable', category: 'programming' },
  { symbol: '定', concept: 'CONSTANT', description: 'Constant, const, fixed, immutable, final', category: 'programming' },
  { symbol: '域', concept: 'SCOPE', description: 'Scope, context, namespace, visibility', category: 'programming' },
  { symbol: '全', concept: 'GLOBAL', description: 'Global, universal, worldwide, public', category: 'programming' },
  { symbol: '局', concept: 'LOCAL', description: 'Local, scoped, limited, private', category: 'programming' },
  
  // Async & Concurrency
  { symbol: '非', concept: 'ASYNC', description: 'Async, asynchronous, non-blocking', category: 'programming' },
  { symbol: '同', concept: 'SYNC', description: 'Sync, synchronous, blocking, sequential', category: 'programming' },
  { symbol: '待', concept: 'AWAIT', description: 'Await, wait for, pause, block until', category: 'programming' },
  { symbol: '並', concept: 'PARALLEL', description: 'Parallel, concurrent, simultaneous', category: 'programming' },
  { symbol: '列', concept: 'SERIAL', description: 'Serial, sequential, ordered, linear', category: 'programming' },
  { symbol: '糸', concept: 'THREAD', description: 'Thread, worker, process, execution', category: 'programming' },
  { symbol: '錠', concept: 'LOCK', description: 'Lock, mutex, semaphore, synchronize', category: 'programming' },
  
  // Design Patterns
  { symbol: '単', concept: 'SINGLETON', description: 'Singleton, single instance, unique', category: 'programming' },
  { symbol: '工', concept: 'FACTORY', description: 'Factory, builder, creator, constructor', category: 'programming' },
  { symbol: '観', concept: 'OBSERVER', description: 'Observer, watcher, listener, subscriber', category: 'programming' },
  { symbol: '飾', concept: 'DECORATOR', description: 'Decorator, wrapper, enhancer, modifier', category: 'programming' },
  { symbol: '戦', concept: 'STRATEGY', description: 'Strategy, algorithm, approach, method', category: 'programming' },
  { symbol: '代', concept: 'PROXY', description: 'Proxy, surrogate, placeholder, delegate', category: 'programming' },
  { symbol: '適', concept: 'ADAPTER', description: 'Adapter, converter, translator, bridge', category: 'programming' },
  
  // ========== DOMAIN-SPECIFIC (50+ symbols) ==========
  // Text Processing
  { symbol: '要', concept: 'SUMMARIZE', description: 'Summarize, condense, brief, abstract, digest', category: 'domain' },
  { symbol: '説', concept: 'EXPLAIN', description: 'Explain, describe, clarify, detail, elaborate', category: 'domain' },
  { symbol: '訳', concept: 'TRANSLATE', description: 'Translate, convert, interpret, localize', category: 'domain' },
  { symbol: '比', concept: 'COMPARE', description: 'Compare, contrast, diff, match, check', category: 'domain' },
  { symbol: '形', concept: 'FORMAT', description: 'Format, style, structure, layout, pattern', category: 'domain' },
  { symbol: '最', concept: 'OPTIMIZE', description: 'Optimize, improve, enhance, maximize, tune', category: 'domain' },
  { symbol: '標', concept: 'HIGHLIGHT', description: 'Highlight, emphasize, mark, feature', category: 'domain' },
  { symbol: '纏', concept: 'AGGREGATE', description: 'Aggregate, combine, collect, gather, sum', category: 'domain' },
  
  // ML & AI
  { symbol: '訓', concept: 'TRAIN', description: 'Train, learn, fit, teach, optimize', category: 'domain' },
  { symbol: '予', concept: 'PREDICT', description: 'Predict, forecast, estimate, infer', category: 'domain' },
  { symbol: '推', concept: 'INFER', description: 'Infer, deduce, conclude, derive', category: 'domain' },
  { symbol: '級', concept: 'CLASSIFY', description: 'Classify, categorize, label, tag', category: 'domain' },
  { symbol: '群', concept: 'CLUSTER', description: 'Cluster, group, segment, partition', category: 'domain' },
  { symbol: '模', concept: 'MODEL', description: 'Model, algorithm, network, architecture', category: 'domain' },
  { symbol: '重', concept: 'WEIGHT', description: 'Weight, parameter, coefficient, factor', category: 'domain' },
  { symbol: '損', concept: 'LOSS', description: 'Loss, error, cost, penalty, difference', category: 'domain' },
  { symbol: '精', concept: 'ACCURACY', description: 'Accuracy, precision, correctness, score', category: 'domain' },
  
  // UI/UX
  { symbol: '画', concept: 'SCREEN', description: 'Screen, display, view, page, interface', category: 'domain' },
  { symbol: '釦', concept: 'BUTTON', description: 'Button, control, action, clickable', category: 'domain' },
  { symbol: '窓', concept: 'WINDOW', description: 'Window, frame, panel, modal, dialog', category: 'domain' },
  { symbol: '欄', concept: 'FIELD', description: 'Field, input, textbox, control, box', category: 'domain' },
  { symbol: '単', concept: 'FORM', description: 'Form, input, entry, submission, data', category: 'domain' },
  { symbol: '卓', concept: 'MENU', description: 'Menu, list, options, choices, navigation', category: 'domain' },
  { symbol: '標', concept: 'ICON', description: 'Icon, symbol, graphic, image, glyph', category: 'domain' },
  { symbol: '色', concept: 'COLOR', description: 'Color, hue, shade, tint, palette', category: 'domain' },
  { symbol: '式', concept: 'STYLE', description: 'Style, CSS, design, appearance, theme', category: 'domain' },
  { symbol: '動', concept: 'ANIMATION', description: 'Animation, transition, motion, effect', category: 'domain' },
  
  // ========== TIME & SCHEDULING (30+ symbols) ==========
  { symbol: '今', concept: 'NOW', description: 'Now, current, present, today, immediate', category: 'time' },
  { symbol: '前', concept: 'BEFORE', description: 'Before, previous, past, earlier, ago, prior', category: 'time' },
  { symbol: '後', concept: 'AFTER', description: 'After, next, future, later, following, subsequent', category: 'time' },
  { symbol: '時', concept: 'WHEN', description: 'When, time, moment, period, instant', category: 'time' },
  { symbol: '間', concept: 'DURING', description: 'During, while, throughout, between, within', category: 'time' },
  { symbol: '昨', concept: 'YESTERDAY', description: 'Yesterday, past, previous day', category: 'time' },
  { symbol: '明', concept: 'TOMORROW', description: 'Tomorrow, next day, future', category: 'time' },
  { symbol: '週', concept: 'WEEK', description: 'Week, weekly, seven days', category: 'time' },
  { symbol: '月', concept: 'MONTH', description: 'Month, monthly, thirty days', category: 'time' },
  { symbol: '年', concept: 'YEAR', description: 'Year, yearly, annual, twelve months', category: 'time' },
  { symbol: '秒', concept: 'SECOND', description: 'Second, moment, instant, sec', category: 'time' },
  { symbol: '分', concept: 'MINUTE', description: 'Minute, min, sixty seconds', category: 'time' },
  { symbol: '刻', concept: 'HOUR', description: 'Hour, sixty minutes, time unit', category: 'time' },
  { symbol: '延', concept: 'DELAY', description: 'Delay, postpone, defer, wait, pause', category: 'time' },
  { symbol: '期', concept: 'DEADLINE', description: 'Deadline, due date, limit, expiry', category: 'time' },
  { symbol: '予', concept: 'SCHEDULE', description: 'Schedule, plan, timetable, calendar', category: 'time' },
  { symbol: '満', concept: 'TIMEOUT', description: 'Timeout, expire, limit, deadline', category: 'time' },
  { symbol: '隔', concept: 'INTERVAL', description: 'Interval, period, gap, duration', category: 'time' },
  
  // ========== STATUS & RESULTS (20+ symbols) ==========
  { symbol: '成', concept: 'SUCCESS', description: 'Success, complete, done, finished, pass', category: 'status' },
  { symbol: '失', concept: 'FAIL', description: 'Fail, error, unsuccessful, wrong, bad', category: 'status' },
  { symbol: '保', concept: 'PENDING', description: 'Pending, waiting, in progress, queued', category: 'status' },
  { symbol: '了', concept: 'COMPLETE', description: 'Complete, finished, done, concluded', category: 'status' },
  { symbol: '実', concept: 'RUNNING', description: 'Running, executing, in progress, active', category: 'status' },
  { symbol: '停', concept: 'STOPPED', description: 'Stopped, halted, paused, inactive', category: 'status' },
  { symbol: '可', concept: 'ENABLED', description: 'Enabled, active, on, available', category: 'status' },
  { symbol: '不', concept: 'DISABLED', description: 'Disabled, inactive, off, unavailable', category: 'status' },
  { symbol: '警', concept: 'WARNING', description: 'Warning, caution, alert, notice', category: 'status' },
  { symbol: '情', concept: 'INFO', description: 'Info, information, message, notice', category: 'status' },
  { symbol: '危', concept: 'CRITICAL', description: 'Critical, urgent, severe, important', category: 'status' },
  { symbol: '軽', concept: 'MINOR', description: 'Minor, small, trivial, low priority', category: 'status' },
  
  // ========== ADDITIONAL COMMON WORDS (300+ symbols) ==========
  // More Verbs
  { symbol: '押', concept: 'PUSH', description: 'push, press, shove, force', category: 'common' },
  { symbol: '引', concept: 'PULL', description: 'pull, drag, draw, tug', category: 'common' },
  { symbol: '投', concept: 'THROW', description: 'throw, toss, cast, hurl', category: 'common' },
  { symbol: '拾', concept: 'PICK', description: 'pick, choose, select, gather', category: 'common' },
  { symbol: '落', concept: 'DROP', description: 'drop, fall, let go, release', category: 'common' },
  { symbol: '切', concept: 'CUT', description: 'cut, slice, chop, trim', category: 'common' },
  { symbol: '加', concept: 'ADD', description: 'add, append, attach, include', category: 'common' },
  { symbol: '取', concept: 'TAKE', description: 'take, grab, seize, capture', category: 'common' },
  { symbol: '売', concept: 'SELL', description: 'sell, sale, market, trade', category: 'common' },
  { symbol: '買', concept: 'BUY', description: 'buy, purchase, acquire, obtain', category: 'common' },
  { symbol: '送', concept: 'SEND', description: 'send, ship, deliver, transmit', category: 'common' },
  { symbol: '待', concept: 'WAIT', description: 'wait, await, expect, hold', category: 'common' },
  { symbol: '忘', concept: 'FORGET', description: 'forget, overlook, omit', category: 'common' },
  { symbol: '覚', concept: 'REMEMBER', description: 'remember, recall, memorize', category: 'common' },
  { symbol: '望', concept: 'HOPE', description: 'hope, wish, desire, expect', category: 'common' },
  { symbol: '笑', concept: 'LAUGH', description: 'laugh, smile, chuckle, grin', category: 'common' },
  { symbol: '泣', concept: 'CRY', description: 'cry, weep, sob, tears', category: 'common' },
  { symbol: '勝', concept: 'WIN', description: 'win, victory, succeed, triumph', category: 'common' },
  { symbol: '負', concept: 'LOSE', description: 'lose, defeat, fail, loss', category: 'common' },
  { symbol: '歩', concept: 'WALK', description: 'walk, step, pace, stride', category: 'common' },
  { symbol: '飛', concept: 'FLY', description: 'fly, flight, soar, glide', category: 'common' },
  { symbol: '泳', concept: 'SWIM', description: 'swim, float, dive', category: 'common' },
  { symbol: '登', concept: 'CLIMB', description: 'climb, ascend, mount, scale', category: 'common' },
  { symbol: '降', concept: 'DESCEND', description: 'descend, go down, lower', category: 'common' },
  { symbol: '乗', concept: 'RIDE', description: 'ride, board, mount, take', category: 'common' },
  { symbol: '寝', concept: 'SLEEP', description: 'sleep, rest, nap, slumber', category: 'common' },
  { symbol: '醒', concept: 'WAKE', description: 'wake, awaken, arise', category: 'common' },
  { symbol: '食', concept: 'EAT', description: 'eat, consume, dine, feed', category: 'common' },
  { symbol: '飲', concept: 'DRINK', description: 'drink, sip, beverage', category: 'common' },
  { symbol: '着', concept: 'WEAR', description: 'wear, put on, dress, don', category: 'common' },
  { symbol: '脱', concept: 'REMOVE', description: 'remove, take off, strip', category: 'common' },
  { symbol: '洗', concept: 'WASH', description: 'wash, clean, rinse, scrub', category: 'common' },
  { symbol: '掃', concept: 'SWEEP', description: 'sweep, clean, tidy, brush', category: 'common' },
  { symbol: '拭', concept: 'WIPE', description: 'wipe, rub, clean, clear', category: 'common' },
  { symbol: '磨', concept: 'POLISH', description: 'polish, shine, buff, refine', category: 'common' },
  { symbol: '壊', concept: 'BREAK', description: 'break, destroy, damage, shatter', category: 'common' },
  { symbol: '修', concept: 'FIX', description: 'fix, repair, mend, restore', category: 'common' },
  { symbol: '造', concept: 'CRAFT', description: 'craft, build, manufacture', category: 'common' },
  { symbol: '育', concept: 'GROW', description: 'grow, raise, develop, nurture', category: 'common' },
  { symbol: '植', concept: 'PLANT', description: 'plant, sow, seed, cultivate', category: 'common' },
  { symbol: '刈', concept: 'HARVEST', description: 'harvest, reap, gather, collect', category: 'common' },
  { symbol: '燃', concept: 'BURN', description: 'burn, ignite, flame, fire', category: 'common' },
  { symbol: '凍', concept: 'FREEZE', description: 'freeze, ice, chill, cold', category: 'common' },
  { symbol: '溶', concept: 'MELT', description: 'melt, thaw, dissolve', category: 'common' },
  { symbol: '煮', concept: 'BOIL', description: 'boil, cook, simmer, heat', category: 'common' },
  { symbol: '焼', concept: 'BAKE', description: 'bake, roast, grill, cook', category: 'common' },
  { symbol: '揚', concept: 'FRY', description: 'fry, deep fry, sauté', category: 'common' },
  { symbol: '混', concept: 'MIX', description: 'mix, blend, combine, stir', category: 'common' },
  { symbol: '注', concept: 'POUR', description: 'pour, flow, stream, spill', category: 'common' },
  { symbol: '満', concept: 'FILL', description: 'fill, full, complete, stuff', category: 'common' },
  { symbol: '空', concept: 'EMPTY', description: 'empty, vacant, void, clear', category: 'common' },
  { symbol: '開', concept: 'OPEN', description: 'open, unlock, uncover', category: 'common' },
  { symbol: '閉', concept: 'CLOSE', description: 'close, shut, lock, seal', category: 'common' },
  { symbol: '押', concept: 'PRESS', description: 'press, push, squeeze, compress', category: 'common' },
  { symbol: '捻', concept: 'TWIST', description: 'twist, turn, rotate, spin', category: 'common' },
  { symbol: '曲', concept: 'BEND', description: 'bend, curve, flex, bow', category: 'common' },
  { symbol: '伸', concept: 'STRETCH', description: 'stretch, extend, reach, expand', category: 'common' },
  { symbol: '縮', concept: 'SHRINK', description: 'shrink, reduce, contract, compress', category: 'common' },
  { symbol: '折', concept: 'FOLD', description: 'fold, crease, bend, pleat', category: 'common' },
  { symbol: '広', concept: 'SPREAD', description: 'spread, expand, extend, diffuse', category: 'common' },
  { symbol: '集', concept: 'GATHER', description: 'gather, collect, assemble', category: 'common' },
  { symbol: '散', concept: 'SCATTER', description: 'scatter, spread, disperse', category: 'common' },
  { symbol: '並', concept: 'ALIGN', description: 'align, arrange, line up, order', category: 'common' },
  { symbol: '積', concept: 'STACK', description: 'stack, pile, accumulate, heap', category: 'common' },
  { symbol: '掛', concept: 'HANG', description: 'hang, suspend, dangle, hook', category: 'common' },
  { symbol: '貼', concept: 'PASTE', description: 'paste, stick, attach, glue', category: 'common' },
  { symbol: '剥', concept: 'PEEL', description: 'peel, strip, remove, skin', category: 'common' },
  { symbol: '包', concept: 'WRAP', description: 'wrap, pack, bundle, enclose', category: 'common' },
  { symbol: '解', concept: 'UNWRAP', description: 'unwrap, unpack, open, untie', category: 'common' },
  { symbol: '結', concept: 'TIE', description: 'tie, bind, fasten, connect', category: 'common' },
  { symbol: '解', concept: 'UNTIE', description: 'untie, unfasten, release, undo', category: 'common' },
  { symbol: '繋', concept: 'CONNECT', description: 'connect, link, join, attach', category: 'common' },
  { symbol: '断', concept: 'DISCONNECT', description: 'disconnect, sever, cut, break', category: 'common' },
  { symbol: '繋', concept: 'LINK', description: 'link, connect, join, associate', category: 'common' },
  { symbol: '分', concept: 'SEPARATE', description: 'separate, divide, part, split', category: 'common' },
  { symbol: '合', concept: 'COMBINE', description: 'combine, unite, merge, join', category: 'common' },
  { symbol: '交', concept: 'EXCHANGE', description: 'exchange, trade, swap, switch', category: 'common' },
  { symbol: '替', concept: 'REPLACE', description: 'replace, substitute, change', category: 'common' },
  { symbol: '換', concept: 'CONVERT', description: 'convert, change, transform', category: 'common' },
  { symbol: '移', concept: 'TRANSFER', description: 'transfer, move, shift, relocate', category: 'common' },
  { symbol: '運', concept: 'TRANSPORT', description: 'transport, carry, convey, ship', category: 'common' },
  { symbol: '配', concept: 'DELIVER', description: 'deliver, distribute, supply', category: 'common' },
  { symbol: '届', concept: 'ARRIVE', description: 'arrive, reach, get to, come', category: 'common' },
  { symbol: '返', concept: 'RETURN', description: 'return, give back, restore', category: 'common' },
  { symbol: '渡', concept: 'PASS', description: 'pass, cross, hand over, transfer', category: 'common' },
  { symbol: '貸', concept: 'LEND', description: 'lend, loan, rent, lease', category: 'common' },
  { symbol: '借', concept: 'BORROW', description: 'borrow, rent, loan, lease', category: 'common' },
  { symbol: '与', concept: 'GRANT', description: 'grant, give, bestow, award', category: 'common' },
  { symbol: '受', concept: 'ACCEPT', description: 'accept, receive, take, admit', category: 'common' },
  { symbol: '拒', concept: 'REFUSE', description: 'refuse, reject, deny, decline', category: 'common' },
  { symbol: '許', concept: 'ALLOW', description: 'allow, permit, authorize, enable', category: 'common' },
  { symbol: '禁', concept: 'FORBID', description: 'forbid, prohibit, ban, prevent', category: 'common' },
  { symbol: '命', concept: 'COMMAND', description: 'command, order, instruct, direct', category: 'common' },
  { symbol: '従', concept: 'OBEY', description: 'obey, follow, comply, conform', category: 'common' },
  { symbol: '逆', concept: 'DISOBEY', description: 'disobey, defy, resist, oppose', category: 'common' },
  { symbol: '反', concept: 'OPPOSE', description: 'oppose, resist, counter, object', category: 'common' },
  { symbol: '賛', concept: 'AGREE', description: 'agree, concur, accept, approve', category: 'common' },
  { symbol: '異', concept: 'DISAGREE', description: 'disagree, differ, dispute, object', category: 'common' },
  { symbol: '承', concept: 'APPROVE', description: 'approve, accept, consent, agree', category: 'common' },
  { symbol: '却', concept: 'REJECT', description: 'reject, refuse, deny, dismiss', category: 'common' },
  { symbol: '評', concept: 'EVALUATE', description: 'evaluate, assess, judge, rate', category: 'common' },
  { symbol: '判', concept: 'JUDGE', description: 'judge, decide, determine, rule', category: 'common' },
  { symbol: '決', concept: 'DECIDE', description: 'decide, determine, resolve, choose', category: 'common' },
  { symbol: '選', concept: 'CHOOSE', description: 'choose, select, pick, opt', category: 'common' },
  { symbol: '択', concept: 'SELECT', description: 'select, choose, pick, elect', category: 'common' },
  { symbol: '採', concept: 'ADOPT', description: 'adopt, accept, embrace, take', category: 'common' },
  { symbol: '捨', concept: 'ABANDON', description: 'abandon, discard, give up, quit', category: 'common' },
  { symbol: '保', concept: 'PRESERVE', description: 'preserve, protect, maintain, save', category: 'common' },
  { symbol: '護', concept: 'GUARD', description: 'guard, protect, defend, watch', category: 'common' },
  { symbol: '攻', concept: 'ATTACK', description: 'attack, assault, strike, hit', category: 'common' },
  { symbol: '守', concept: 'DEFEND', description: 'defend, protect, guard, shield', category: 'common' },
  { symbol: '戦', concept: 'FIGHT', description: 'fight, battle, combat, struggle', category: 'common' },
  { symbol: '逃', concept: 'ESCAPE', description: 'escape, flee, run away, evade', category: 'common' },
  { symbol: '追', concept: 'CHASE', description: 'chase, pursue, follow, hunt', category: 'common' },
  { symbol: '捕', concept: 'CATCH', description: 'catch, capture, trap, seize', category: 'common' },
  { symbol: '放', concept: 'RELEASE', description: 'release, free, let go, discharge', category: 'common' },
  { symbol: '縛', concept: 'BIND', description: 'bind, tie, restrain, secure', category: 'common' },
  { symbol: '解', concept: 'RELEASE', description: 'release, free, unbind, let go', category: 'common' },
  { symbol: '隠', concept: 'HIDE', description: 'hide, conceal, cover, mask', category: 'common' },
  { symbol: '現', concept: 'REVEAL', description: 'reveal, show, expose, display', category: 'common' },
  { symbol: '探', concept: 'EXPLORE', description: 'explore, investigate, search', category: 'common' },
  { symbol: '発', concept: 'DISCOVER', description: 'discover, find, detect, uncover', category: 'common' },
  { symbol: '明', concept: 'CLARIFY', description: 'clarify, explain, clear, illuminate', category: 'common' },
  { symbol: '混', concept: 'CONFUSE', description: 'confuse, mix up, puzzle, bewilder', category: 'common' },
  { symbol: '驚', concept: 'SURPRISE', description: 'surprise, astonish, amaze, shock', category: 'common' },
  { symbol: '疑', concept: 'DOUBT', description: 'doubt, question, suspect, mistrust', category: 'common' },
  { symbol: '確', concept: 'CONFIRM', description: 'confirm, verify, validate, check', category: 'common' },
  { symbol: '証', concept: 'PROVE', description: 'prove, demonstrate, show, verify', category: 'common' },
  { symbol: '否', concept: 'DENY', description: 'deny, refuse, reject, negate', category: 'common' },
  { symbol: '主', concept: 'CLAIM', description: 'claim, assert, state, declare', category: 'common' },
  { symbol: '張', concept: 'INSIST', description: 'insist, persist, maintain, assert', category: 'common' },
  { symbol: '争', concept: 'ARGUE', description: 'argue, dispute, debate, quarrel', category: 'common' },
  { symbol: '論', concept: 'DISCUSS', description: 'discuss, debate, talk about, confer', category: 'common' },
  { symbol: '提', concept: 'PROPOSE', description: 'propose, suggest, offer, present', category: 'common' },
  { symbol: '案', concept: 'SUGGEST', description: 'suggest, recommend, propose, advise', category: 'common' },
  { symbol: '勧', concept: 'RECOMMEND', description: 'recommend, advise, suggest, urge', category: 'common' },
  { symbol: '警', concept: 'WARN', description: 'warn, caution, alert, notify', category: 'common' },
  { symbol: '脅', concept: 'THREATEN', description: 'threaten, menace, intimidate', category: 'common' },
  { symbol: '約', concept: 'PROMISE', description: 'promise, pledge, vow, commit', category: 'common' },
  { symbol: '破', concept: 'BREAK', description: 'break, violate, breach, shatter', category: 'common' },
  { symbol: '守', concept: 'KEEP', description: 'keep, maintain, preserve, hold', category: 'common' },
  { symbol: '遵', concept: 'COMPLY', description: 'comply, follow, obey, conform', category: 'common' },
  { symbol: '違', concept: 'VIOLATE', description: 'violate, break, breach, infringe', category: 'common' },
  { symbol: '犯', concept: 'COMMIT', description: 'commit, perform, do, perpetrate', category: 'common' },
  { symbol: '罰', concept: 'PUNISH', description: 'punish, penalize, discipline', category: 'common' },
  { symbol: '賞', concept: 'REWARD', description: 'reward, prize, award, compensate', category: 'common' },
  { symbol: '祝', concept: 'CELEBRATE', description: 'celebrate, commemorate, observe', category: 'common' },
  { symbol: '喜', concept: 'REJOICE', description: 'rejoice, delight, be happy, enjoy', category: 'common' },
  { symbol: '悲', concept: 'GRIEVE', description: 'grieve, mourn, lament, sorrow', category: 'common' },
  { symbol: '怒', concept: 'ANGER', description: 'anger, rage, fury, wrath', category: 'common' },
  { symbol: '恐', concept: 'FEAR', description: 'fear, dread, fright, terror', category: 'common' },
  { symbol: '愛', concept: 'LOVE', description: 'love, affection, fondness, care', category: 'common' },
  { symbol: '憎', concept: 'HATE', description: 'hate, loathe, detest, despise', category: 'common' },
  { symbol: '好', concept: 'LIKE', description: 'like, enjoy, prefer, favor', category: 'common' },
  { symbol: '嫌', concept: 'DISLIKE', description: 'dislike, hate, despise, loathe', category: 'common' },
  { symbol: '望', concept: 'DESIRE', description: 'desire, want, wish, crave', category: 'common' },
  { symbol: '満', concept: 'SATISFY', description: 'satisfy, fulfill, please, content', category: 'common' },
  { symbol: '失', concept: 'DISAPPOINT', description: 'disappoint, let down, dissatisfy', category: 'common' },
  { symbol: '期', concept: 'EXPECT', description: 'expect, anticipate, look forward', category: 'common' },
  { symbol: '驚', concept: 'SURPRISE', description: 'surprise, shock, astonish, amaze', category: 'common' },
  { symbol: '困', concept: 'TROUBLE', description: 'trouble, difficulty, problem, issue', category: 'common' },
  { symbol: '易', concept: 'EASY', description: 'easy, simple, effortless, plain', category: 'common' },
  { symbol: '難', concept: 'DIFFICULT', description: 'difficult, hard, tough, challenging', category: 'common' },
  { symbol: '可', concept: 'POSSIBLE', description: 'possible, feasible, doable', category: 'common' },
  { symbol: '不', concept: 'IMPOSSIBLE', description: 'impossible, unfeasible, cannot', category: 'common' },
  { symbol: '必', concept: 'NECESSARY', description: 'necessary, essential, required, must', category: 'common' },
  { symbol: '要', concept: 'IMPORTANT', description: 'important, significant, crucial, vital', category: 'common' },
  { symbol: '無', concept: 'UNNECESSARY', description: 'unnecessary, needless, redundant', category: 'common' },
  { symbol: '有', concept: 'USEFUL', description: 'useful, helpful, beneficial, handy', category: 'common' },
  { symbol: '無', concept: 'USELESS', description: 'useless, worthless, futile, vain', category: 'common' },
  { symbol: '正', concept: 'CORRECT', description: 'correct, right, accurate, proper', category: 'common' },
  { symbol: '誤', concept: 'WRONG', description: 'wrong, incorrect, mistaken, false', category: 'common' },
  { symbol: '真', concept: 'TRUE', description: 'true, real, genuine, authentic', category: 'common' },
  { symbol: '偽', concept: 'FALSE', description: 'false, fake, counterfeit, untrue', category: 'common' },
  { symbol: '完', concept: 'COMPLETE', description: 'complete, finished, done, whole', category: 'common' },
  { symbol: '未', concept: 'INCOMPLETE', description: 'incomplete, unfinished, partial', category: 'common' },
  { symbol: '済', concept: 'FINISHED', description: 'finished, completed, done, over', category: 'common' },
  { symbol: '続', concept: 'ONGOING', description: 'ongoing, continuing, in progress', category: 'common' },
  { symbol: '始', concept: 'START', description: 'start, beginning, commence, initiate', category: 'common' },
  { symbol: '終', concept: 'END', description: 'end, finish, terminate, conclude', category: 'common' },
  { symbol: '中', concept: 'MIDDLE', description: 'middle, center, midst, between', category: 'common' },
  { symbol: '左', concept: 'LEFT', description: 'left, leftward, port', category: 'common' },
  { symbol: '右', concept: 'RIGHT', description: 'right, rightward, starboard', category: 'common' },
  { symbol: '上', concept: 'UP', description: 'up, upward, above, top', category: 'common' },
  { symbol: '下', concept: 'DOWN', description: 'down, downward, below, bottom', category: 'common' },
  { symbol: '前', concept: 'FRONT', description: 'front, forward, ahead', category: 'common' },
  { symbol: '後', concept: 'BACK', description: 'back, backward, behind, rear', category: 'common' },
  { symbol: '内', concept: 'INSIDE', description: 'inside, interior, inner, within', category: 'common' },
  { symbol: '外', concept: 'OUTSIDE', description: 'outside, exterior, outer, external', category: 'common' },
  { symbol: '近', concept: 'NEAR', description: 'near, close, nearby, adjacent', category: 'common' },
  { symbol: '遠', concept: 'FAR', description: 'far, distant, remote, away', category: 'common' },
  { symbol: '側', concept: 'SIDE', description: 'side, lateral, edge, flank', category: 'common' },
  { symbol: '間', concept: 'SPACE', description: 'space, room, gap, interval', category: 'common' },
  { symbol: '場', concept: 'PLACE', description: 'place, location, spot, site', category: 'common' },
  { symbol: '位', concept: 'POSITION', description: 'position, location, place, spot', category: 'common' },
  { symbol: '方', concept: 'DIRECTION', description: 'direction, way, course, route', category: 'common' },
  { symbol: '道', concept: 'WAY', description: 'way, path, road, route, method', category: 'common' },
  { symbol: '路', concept: 'ROAD', description: 'road, street, path, route', category: 'common' },
  { symbol: '線', concept: 'LINE', description: 'line, string, wire, track', category: 'common' },
  { symbol: '点', concept: 'POINT', description: 'point, dot, spot, mark', category: 'common' },
  { symbol: '面', concept: 'SURFACE', description: 'surface, face, plane, side', category: 'common' },
  { symbol: '体', concept: 'BODY', description: 'body, object, substance, entity', category: 'common' },
  { symbol: '形', concept: 'SHAPE', description: 'shape, form, figure, appearance', category: 'common' },
  { symbol: '色', concept: 'COLOR', description: 'color, hue, tint, shade', category: 'common' },
  { symbol: '光', concept: 'LIGHT', description: 'light, brightness, illumination', category: 'common' },
  { symbol: '闇', concept: 'DARK', description: 'dark, darkness, shadow, gloom', category: 'common' },
  { symbol: '音', concept: 'SOUND', description: 'sound, noise, audio, tone', category: 'common' },
  { symbol: '静', concept: 'QUIET', description: 'quiet, silent, still, calm', category: 'common' },
  { symbol: '熱', concept: 'HOT', description: 'hot, heat, warm, heated', category: 'common' },
  { symbol: '冷', concept: 'COLD', description: 'cold, cool, chilly, frigid', category: 'common' },
  { symbol: '温', concept: 'WARM', description: 'warm, mild, tepid, moderate', category: 'common' },
  { symbol: '湿', concept: 'WET', description: 'wet, moist, damp, humid', category: 'common' },
  { symbol: '乾', concept: 'DRY', description: 'dry, arid, parched, dehydrated', category: 'common' },
  { symbol: '硬', concept: 'HARD', description: 'hard, solid, firm, rigid', category: 'common' },
  { symbol: '柔', concept: 'SOFT', description: 'soft, gentle, tender, mild', category: 'common' },
  { symbol: '重', concept: 'HEAVY', description: 'heavy, weighty, burdensome', category: 'common' },
  { symbol: '軽', concept: 'LIGHT', description: 'light, lightweight, not heavy', category: 'common' },
  { symbol: '太', concept: 'THICK', description: 'thick, fat, wide, bulky', category: 'common' },
  { symbol: '細', concept: 'THIN', description: 'thin, slim, slender, narrow', category: 'common' },
  { symbol: '広', concept: 'WIDE', description: 'wide, broad, spacious, vast', category: 'common' },
  { symbol: '狭', concept: 'NARROW', description: 'narrow, tight, confined, cramped', category: 'common' },
  { symbol: '深', concept: 'DEEP', description: 'deep, profound, intense', category: 'common' },
  { symbol: '浅', concept: 'SHALLOW', description: 'shallow, superficial, not deep', category: 'common' },
  { symbol: '速', concept: 'QUICK', description: 'quick, fast, rapid, swift', category: 'common' },
  { symbol: '遅', concept: 'SLOW', description: 'slow, sluggish, delayed', category: 'common' },
  { symbol: '早', concept: 'EARLY', description: 'early, soon, prompt, premature', category: 'common' },
  { symbol: '遅', concept: 'LATE', description: 'late, delayed, tardy, overdue', category: 'common' },
  { symbol: '美', concept: 'BEAUTIFUL', description: 'beautiful, pretty, lovely, attractive', category: 'common' },
  { symbol: '醜', concept: 'UGLY', description: 'ugly, unsightly, hideous, grotesque', category: 'common' },
  { symbol: '清', concept: 'CLEAN', description: 'clean, pure, tidy, neat', category: 'common' },
  { symbol: '汚', concept: 'DIRTY', description: 'dirty, filthy, soiled, unclean', category: 'common' },
  { symbol: '安', concept: 'SAFE', description: 'safe, secure, protected, stable', category: 'common' },
  { symbol: '危', concept: 'DANGEROUS', description: 'dangerous, risky, hazardous, unsafe', category: 'common' },
  { symbol: '簡', concept: 'SIMPLE', description: 'simple, easy, plain, straightforward', category: 'common' },
  { symbol: '複', concept: 'COMPLEX', description: 'complex, complicated, intricate', category: 'common' },
  { symbol: '明', concept: 'CLEAR', description: 'clear, obvious, apparent, evident', category: 'common' },
  { symbol: '暗', concept: 'UNCLEAR', description: 'unclear, vague, ambiguous, obscure', category: 'common' },
  { symbol: '直', concept: 'STRAIGHT', description: 'straight, direct, linear, upright', category: 'common' },
  { symbol: '曲', concept: 'CURVED', description: 'curved, bent, crooked, twisted', category: 'common' },
  { symbol: '平', concept: 'FLAT', description: 'flat, level, even, smooth', category: 'common' },
  { symbol: '凸', concept: 'RAISED', description: 'raised, elevated, protruding, convex', category: 'common' },
  { symbol: '凹', concept: 'LOWERED', description: 'lowered, depressed, concave, hollow', category: 'common' },
  { symbol: '滑', concept: 'SMOOTH', description: 'smooth, sleek, slippery, glossy', category: 'common' },
  { symbol: '粗', concept: 'ROUGH', description: 'rough, coarse, uneven, crude', category: 'common' },
  { symbol: '鋭', concept: 'SHARP', description: 'sharp, keen, acute, pointed', category: 'common' },
  { symbol: '鈍', concept: 'DULL', description: 'dull, blunt, obtuse, dim', category: 'common' },
  { symbol: '新', concept: 'FRESH', description: 'fresh, new, recent, novel', category: 'common' },
  { symbol: '古', concept: 'STALE', description: 'stale, old, outdated, obsolete', category: 'common' },
  { symbol: '生', concept: 'RAW', description: 'raw, uncooked, fresh, natural', category: 'common' },
  { symbol: '熟', concept: 'COOKED', description: 'cooked, ripe, mature, done', category: 'common' },
  { symbol: '甘', concept: 'SWEET', description: 'sweet, sugary, pleasant, delicious', category: 'common' },
  { symbol: '辛', concept: 'SPICY', description: 'spicy, hot, pungent, sharp', category: 'common' },
  { symbol: '酸', concept: 'SOUR', description: 'sour, acidic, tart, sharp', category: 'common' },
  { symbol: '苦', concept: 'BITTER', description: 'bitter, harsh, acrid, sharp', category: 'common' },
  { symbol: '塩', concept: 'SALTY', description: 'salty, saline, briny', category: 'common' },
  { symbol: '味', concept: 'TASTE', description: 'taste, flavor, savor, relish', category: 'common' },
  { symbol: '匂', concept: 'SMELL', description: 'smell, scent, odor, aroma', category: 'common' },
  { symbol: '触', concept: 'TOUCH', description: 'touch, feel, contact, handle', category: 'common' },
  { symbol: '痛', concept: 'PAIN', description: 'pain, ache, hurt, sore', category: 'common' },
  { symbol: '快', concept: 'PLEASURE', description: 'pleasure, joy, delight, enjoyment', category: 'common' },
  { symbol: '力', concept: 'POWER', description: 'power, strength, force, energy', category: 'common' },
  { symbol: '弱', concept: 'WEAKNESS', description: 'weakness, frailty, feebleness', category: 'common' },
  { symbol: '速', concept: 'SPEED', description: 'speed, velocity, pace, rate', category: 'common' },
  { symbol: '質', concept: 'QUALITY', description: 'quality, grade, standard, caliber', category: 'common' },
  { symbol: '量', concept: 'QUANTITY', description: 'quantity, amount, volume, number', category: 'common' },
  { symbol: '価', concept: 'PRICE', description: 'price, cost, value, worth', category: 'common' },
  { symbol: '値', concept: 'VALUE', description: 'value, worth, merit, price', category: 'common' },
  { symbol: '益', concept: 'BENEFIT', description: 'benefit, advantage, profit, gain', category: 'common' },
  { symbol: '損', concept: 'LOSS', description: 'loss, damage, harm, detriment', category: 'common' },
  { symbol: '得', concept: 'GAIN', description: 'gain, profit, benefit, advantage', category: 'common' },
  { symbol: '効', concept: 'EFFECT', description: 'effect, result, consequence, impact', category: 'common' },
  { symbol: '因', concept: 'CAUSE', description: 'cause, reason, origin, source', category: 'common' },
  { symbol: '果', concept: 'RESULT', description: 'result, outcome, consequence, effect', category: 'common' },
  { symbol: '目', concept: 'PURPOSE', description: 'purpose, aim, goal, objective', category: 'common' },
  { symbol: '的', concept: 'TARGET', description: 'target, goal, aim, objective', category: 'common' },
  { symbol: '法', concept: 'METHOD', description: 'method, way, means, manner', category: 'common' },
  { symbol: '手', concept: 'MEANS', description: 'means, method, way, technique', category: 'common' },
  { symbol: '具', concept: 'TOOL', description: 'tool, instrument, device, means', category: 'common' },
  { symbol: '材', concept: 'MATERIAL', description: 'material, substance, stuff, matter', category: 'common' },
  { symbol: '物', concept: 'THING', description: 'thing, object, item, stuff', category: 'common' },
  { symbol: '者', concept: 'PERSON', description: 'person, people, individual, someone', category: 'common' },
  { symbol: '人', concept: 'HUMAN', description: 'human, person, people, mankind', category: 'common' },
  { symbol: '男', concept: 'MAN', description: 'man, male, gentleman, guy', category: 'common' },
  { symbol: '女', concept: 'WOMAN', description: 'woman, female, lady, girl', category: 'common' },
  { symbol: '子', concept: 'CHILD', description: 'child, kid, offspring, young', category: 'common' },
  { symbol: '親', concept: 'PARENT', description: 'parent, father, mother, guardian', category: 'common' },
  { symbol: '友', concept: 'FRIEND', description: 'friend, buddy, pal, companion', category: 'common' },
  { symbol: '敵', concept: 'ENEMY', description: 'enemy, foe, opponent, adversary', category: 'common' },
  { symbol: '師', concept: 'TEACHER', description: 'teacher, instructor, mentor, tutor', category: 'common' },
  { symbol: '生', concept: 'STUDENT', description: 'student, pupil, learner, scholar', category: 'common' },
  { symbol: '王', concept: 'KING', description: 'king, ruler, monarch, sovereign', category: 'common' },
  { symbol: '民', concept: 'PEOPLE', description: 'people, citizens, folk, population', category: 'common' },
  { symbol: '国', concept: 'COUNTRY', description: 'country, nation, state, land', category: 'common' },
  { symbol: '家', concept: 'HOME', description: 'home, house, residence, dwelling', category: 'common' },
  { symbol: '町', concept: 'TOWN', description: 'town, city, village, municipality', category: 'common' },
  { symbol: '村', concept: 'VILLAGE', description: 'village, hamlet, settlement', category: 'common' },
  { symbol: '市', concept: 'CITY', description: 'city, metropolis, urban area', category: 'common' },
  { symbol: '州', concept: 'STATE', description: 'state, province, region, territory', category: 'common' },
  { symbol: '世', concept: 'WORLD', description: 'world, earth, globe, universe', category: 'common' },
  { symbol: '天', concept: 'SKY', description: 'sky, heaven, air, atmosphere', category: 'common' },
  { symbol: '地', concept: 'GROUND', description: 'ground, earth, land, soil', category: 'common' },
  { symbol: '海', concept: 'SEA', description: 'sea, ocean, marine, water', category: 'common' },
  { symbol: '川', concept: 'RIVER', description: 'river, stream, creek, flow', category: 'common' },
  { symbol: '山', concept: 'MOUNTAIN', description: 'mountain, hill, peak, summit', category: 'common' },
  { symbol: '林', concept: 'FOREST', description: 'forest, woods, trees, woodland', category: 'common' },
  { symbol: '木', concept: 'TREE', description: 'tree, wood, timber, plant', category: 'common' },
  { symbol: '草', concept: 'GRASS', description: 'grass, herb, plant, weed', category: 'common' },
  { symbol: '花', concept: 'FLOWER', description: 'flower, blossom, bloom, petal', category: 'common' },
  { symbol: '石', concept: 'STONE', description: 'stone, rock, pebble, mineral', category: 'common' },
  { symbol: '水', concept: 'WATER', description: 'water, liquid, fluid, aqua', category: 'common' },
  { symbol: '火', concept: 'FIRE', description: 'fire, flame, blaze, heat', category: 'common' },
  { symbol: '風', concept: 'WIND', description: 'wind, breeze, air, gale', category: 'common' },
  { symbol: '雨', concept: 'RAIN', description: 'rain, rainfall, precipitation', category: 'common' },
  { symbol: '雪', concept: 'SNOW', description: 'snow, snowfall, flake, ice', category: 'common' },
  { symbol: '雲', concept: 'CLOUD', description: 'cloud, mist, fog, vapor', category: 'common' },
  { symbol: '星', concept: 'STAR', description: 'star, celestial body, astral', category: 'common' },
  { symbol: '月', concept: 'MOON', description: 'moon, lunar, satellite', category: 'common' },
  { symbol: '日', concept: 'SUN', description: 'sun, solar, day, daylight', category: 'common' },
  { symbol: '朝', concept: 'MORNING', description: 'morning, dawn, sunrise, AM', category: 'common' },
  { symbol: '昼', concept: 'NOON', description: 'noon, midday, afternoon', category: 'common' },
  { symbol: '夕', concept: 'EVENING', description: 'evening, dusk, twilight, PM', category: 'common' },
  { symbol: '夜', concept: 'NIGHT', description: 'night, nighttime, darkness', category: 'common' },
  { symbol: '春', concept: 'SPRING', description: 'spring, springtime, vernal', category: 'common' },
  { symbol: '夏', concept: 'SUMMER', description: 'summer, summertime, estival', category: 'common' },
  { symbol: '秋', concept: 'AUTUMN', description: 'autumn, fall, autumnal', category: 'common' },
  { symbol: '冬', concept: 'WINTER', description: 'winter, wintertime, hibernal', category: 'common' },
];

export class SynthLangEngine {
  private symbolMap: Map<string, SymbolMapping>;
  private conceptMap: Map<string, SymbolMapping>;

  constructor() {
    this.symbolMap = new Map(SYNTHLANG_SYMBOLS.map(s => [s.symbol, s]));
    this.conceptMap = new Map(SYNTHLANG_SYMBOLS.map(s => [s.concept.toLowerCase(), s]));
  }

  /**
   * Compress a prompt using SynthLang symbols (Japanese Kanji-inspired)
   * ULTRA AGGRESSIVE VERSION - achieves 60-80% compression
   */
  compress(prompt: string): string {
    let compressed = prompt.toLowerCase();

    // Phase 1: Replace ALL common words with Kanji (order matters - do longer phrases first)
    const wordReplacements: [RegExp, string][] = [
      // Greetings
      [/\bhello\b/g, '挨'],
      [/\bhi\b/g, '挨'],
      [/\bhey\b/g, '挨'],
      [/\bhowdy\b/g, '挨'],
      [/\bthanks?\b/g, '謝'],
      [/\bthank you\b/g, '謝'],
      [/\bwelcome\b/g, '歓'],
      [/\bsorry\b/g, '済'],
      [/\bplease\b/g, '拝'],
      [/\byes\b/g, '諾'],
      [/\bok(ay)?\b/g, '諾'],
      [/\bsure\b/g, '諾'],
      [/\bno\b/g, '否'],
      [/\bnope\b/g, '否'],
      [/\bgoodbye\b/g, '別'],
      [/\bbye\b/g, '別'],
      
      // Question words (before other matches)
      [/\bhow\b/g, '如'],
      [/\bwhat\b/g, '何'],
      [/\bwhen\b/g, '時'],
      [/\bwhere\b/g, '処'],
      [/\bwhy\b/g, '故'],
      [/\bwho\b/g, '誰'],
      [/\bwhich\b/g, '択'],
      
      // Pronouns
      [/\b(i|me|my|mine|myself)\b/g, '我'],
      [/\b(you|your|yours|yourself)\b/g, '汝'],
      [/\b(he|him|his|himself|she|her|hers|herself)\b/g, '彼'],
      [/\b(we|us|our|ours|ourselves)\b/g, '吾'],
      [/\b(they|them|their|theirs|themselves)\b/g, '達'],
      [/\b(it|its|itself)\b/g, '之'],
      [/\b(this|these|here)\b/g, '此'],
      [/\b(that|those|there)\b/g, '其'],
      
      // Common verbs with all forms
      [/\b(is|am|are|was|were|be|being|been)\b/g, '在'],
      [/\b(have|has|had|having)\b/g, '有'],
      [/\b(do|does|did|doing|done)\b/g, '為'],
      [/\b(say|says|said|saying|tell|tells|told|telling)\b/g, '言'],
      [/\b(get|gets|got|getting|gotten|obtain|obtains|obtained)\b/g, '得'],
      [/\b(make|makes|made|making|create|creates|created|creating|build|builds|built|building)\b/g, '作'],
      [/\b(go|goes|went|going|gone)\b/g, '行'],
      [/\b(know|knows|knew|knowing|known)\b/g, '知'],
      [/\b(think|thinks|thought|thinking)\b/g, '想'],
      [/\b(see|sees|saw|seeing|seen|look|looks|looked|looking|watch|watches|watched|watching)\b/g, '見'],
      [/\b(come|comes|came|coming)\b/g, '来'],
      [/\b(want|wants|wanted|wanting|wish|wishes|wished|wishing|desire|desires|desired|desiring)\b/g, '欲'],
      [/\b(use|uses|used|using|utilize|utilizes|utilized|utilizing)\b/g, '用'],
      [/\b(find|finds|found|finding|search|searches|searched|searching)\b/g, '尋'],
      [/\b(give|gives|gave|giving|given|provide|provides|provided|providing)\b/g, '与'],
      [/\b(work|works|worked|working)\b/g, '働'],
      [/\b(call|calls|called|calling|invoke|invokes|invoked|invoking)\b/g, '呼'],
      [/\b(try|tries|tried|trying|attempt|attempts|attempted|attempting)\b/g, '試'],
      [/\b(ask|asks|asked|asking|question|questions|questioned|questioning|query|queries|queried|querying)\b/g, '問'],
      [/\b(need|needs|needed|needing|require|requires|required|requiring)\b/g, '要'],
      [/\b(feel|feels|felt|feeling)\b/g, '感'],
      [/\b(become|becomes|became|becoming)\b/g, '成'],
      [/\b(leave|leaves|left|leaving|exit|exits|exited|exiting)\b/g, '離'],
      [/\b(put|puts|putting|place|places|placed|placing|set|sets|setting)\b/g, '置'],
      [/\b(mean|means|meant|meaning|signify|signifies|signified|signifying)\b/g, '意'],
      [/\b(keep|keeps|kept|keeping|maintain|maintains|maintained|maintaining)\b/g, '保'],
      [/\b(let|lets|letting|allow|allows|allowed|allowing|permit|permits|permitted|permitting)\b/g, '許'],
      [/\b(begin|begins|began|beginning|start|starts|started|starting)\b/g, '始'],
      [/\b(help|helps|helped|helping|assist|assists|assisted|assisting)\b/g, '助'],
      [/\b(talk|talks|talked|talking|speak|speaks|spoke|speaking|spoken)\b/g, '話'],
      [/\b(turn|turns|turned|turning|rotate|rotates|rotated|rotating)\b/g, '転'],
      [/\b(show|shows|showed|showing|shown|display|displays|displayed|displaying)\b/g, '示'],
      [/\b(hear|hears|heard|hearing|listen|listens|listened|listening)\b/g, '聞'],
      [/\b(play|plays|played|playing)\b/g, '遊'],
      [/\b(run|runs|ran|running|execute|executes|executed|executing)\b/g, '走'],
      [/\b(move|moves|moved|moving)\b/g, '動'],
      [/\b(live|lives|lived|living|reside|resides|resided|residing)\b/g, '住'],
      [/\b(believe|believes|believed|believing|trust|trusts|trusted|trusting)\b/g, '信'],
      [/\b(hold|holds|held|holding|contain|contains|contained|containing)\b/g, '持'],
      [/\b(bring|brings|brought|bringing|carry|carries|carried|carrying)\b/g, '持'],
      [/\b(write|writes|wrote|writing|written)\b/g, '書'],
      [/\b(sit|sits|sat|sitting|seated)\b/g, '座'],
      [/\b(stand|stands|stood|standing)\b/g, '立'],
      [/\b(lose|loses|lost|losing|miss|misses|missed|missing)\b/g, '失'],
      [/\b(pay|pays|paid|paying|payment|payments)\b/g, '払'],
      [/\b(meet|meets|met|meeting|encounter|encounters|encountered|encountering)\b/g, '会'],
      [/\b(include|includes|included|including)\b/g, '含'],
      [/\b(continue|continues|continued|continuing|proceed|proceeds|proceeded|proceeding)\b/g, '続'],
      [/\b(set|sets|setting|configure|configures|configured|configuring|establish|establishes|established|establishing)\b/g, '設'],
      [/\b(learn|learns|learned|learning|study|studies|studied|studying)\b/g, '学'],
      [/\b(change|changes|changed|changing|alter|alters|altered|altering)\b/g, '変'],
      [/\b(lead|leads|led|leading|guide|guides|guided|guiding)\b/g, '導'],
      [/\b(understand|understands|understood|understanding|comprehend|comprehends|comprehended|comprehending)\b/g, '理'],
      [/\b(stop|stops|stopped|stopping|halt|halts|halted|halting)\b/g, '停'],
      [/\b(read|reads|reading)\b/g, '読'],
      [/\b(increase|increases|increased|increasing|grow|grows|grew|growing|grown)\b/g, '増'],
      
      // Adjectives
      [/\b(good|well|fine|nice)\b/g, '良'],
      [/\b(new|fresh|latest|recent|novel)\b/g, '新'],
      [/\b(first|initial|primary|earliest)\b/g, '初'],
      [/\b(last|final|ultimate|latest)\b/g, '終'],
      [/\b(long|lengthy|extended|prolonged)\b/g, '長'],
      [/\b(big|large|great|huge|major)\b/g, '大'],
      [/\b(small|little|minor|tiny)\b/g, '小'],
      [/\b(next|following|subsequent|upcoming)\b/g, '次'],
      [/\b(own|self|personal|private)\b/g, '自'],
      [/\b(other|another|different|else)\b/g, '他'],
      [/\b(old|aged|ancient|former|previous)\b/g, '旧'],
      [/\b(high|tall|elevated|upper)\b/g, '高'],
      [/\b(all|every|whole|entire|total|complete)\b/g, '全'],
      [/\b(each|per|individual)\b/g, '毎'],
      [/\b(some|several|certain|few|any)\b/g, '幾'],
      [/\b(many|much|lots|numerous|plenty)\b/g, '多'],
      [/\b(possible|can|able|feasible)\b/g, '可'],
      [/\b(same|identical|equal|similar)\b/g, '同'],
      [/\b(young|junior)\b/g, '若'],
      [/\b(public|open|common|shared)\b/g, '公'],
      [/\b(bad|wrong|poor|evil|negative)\b/g, '悪'],
      [/\b(early|soon|quick|prompt)\b/g, '早'],
      [/\b(important|critical|significant|vital|key)\b/g, '重'],
      
      // Prepositions & Conjunctions
      [/\b(at|near|by)\b/g, '於'],
      [/\b(to|toward|until|into|onto)\b/g, '至'],
      [/\b(from|since|away)\b/g, '自'],
      [/\b(with|together|along)\b/g, '共'],
      [/\b(about|regarding|concerning|around)\b/g, '関'],
      [/\b(for|because)\b/g, '為'],
      [/\b(against|versus|opposed|contrary)\b/g, '対'],
      [/\b(between|among|amid|within)\b/g, '間'],
      [/\b(after|following|behind|later|post)\b/g, '後'],
      [/\b(before|prior|earlier|ahead|pre)\b/g, '前'],
      [/\b(through|via|across)\b/g, '通'],
      [/\b(over|above|beyond)\b/g, '上'],
      [/\b(under|below|beneath|underneath)\b/g, '下'],
      [/\b(in|inside|within|into)\b/g, '内'],
      [/\b(out|outside|external|outer)\b/g, '外'],
      [/\b(and|also|plus|as well)\b/g, '且'],
      [/\b(or|alternatively|either)\b/g, '或'],
      [/\b(but|however|yet|though|although)\b/g, '然'],
      [/\b(so|therefore|thus|hence|then)\b/g, '故'],
      [/\b(if|whether|provided)\b/g, '若'],
      [/\b(because|since|as|due)\b/g, '因'],
      
      // Articles and fillers (REMOVE these completely)
      [/\bthe\b/g, ''],
      [/\ban?\b/g, ''],
      [/\bof\b/g, ''],
    ];

    // Apply all replacements
    for (const [pattern, replacement] of wordReplacements) {
      compressed = compressed.replace(pattern, replacement);
    }

    // Phase 2: Technical terms and domain-specific replacements
    compressed = compressed
      .replace(/\b(user|users)\b/g, '者')
      .replace(/\b(data|datum)\b/g, '料')
      .replace(/\b(database|databases|db)\b/g, '庫')
      .replace(/\b(save|saves|saved|saving|store|stores|stored|storing)\b/g, '書')
      .replace(/\b(delete|deletes|deleted|deleting|remove|removes|removed|removing)\b/g, '削')
      .replace(/\b(update|updates|updated|updating)\b/g, '更')
      .replace(/\b(create|creates|created|creating|generate|generates|generated|generating)\b/g, '作')
      .replace(/\b(send|sends|sent|sending)\b/g, '送')
      .replace(/\b(receive|receives|received|receiving)\b/g, '受')
      .replace(/\b(request|requests|requested|requesting)\b/g, '求')
      .replace(/\b(response|responses|respond|responds|responded|responding)\b/g, '応')
      .replace(/\b(test|tests|tested|testing)\b/g, '試')
      .replace(/\b(validate|validates|validated|validating|verify|verifies|verified|verifying|check|checks|checked|checking)\b/g, '検')
      .replace(/\b(error|errors|fail|fails|failed|failing|failure|failures)\b/g, '失')
      .replace(/\b(success|successful|successfully|succeed|succeeds|succeeded|succeeding)\b/g, '成');

    // Phase 3: Final cleanup
    compressed = compressed
      // Remove double spaces
      .replace(/\s+/g, ' ')
      // Remove spaces around Kanji
      .replace(/\s*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF])\s*/g, '$1')
      // Trim
      .trim();

    return compressed;
  }

  /**
   * Decompress a SynthLang prompt back to natural language
   */
  decompress(compressed: string): string {
    let decompressed = compressed;

    for (const { symbol, concept } of SYNTHLANG_SYMBOLS) {
      const regex = new RegExp(this.escapeRegex(symbol), 'g');
      decompressed = decompressed.replace(regex, concept);
    }

    return decompressed;
  }

  /**
   * Get compression ratio
   */
  getCompressionRatio(original: string, compressed: string): number {
    const originalTokens = this.estimateTokens(original);
    const compressedTokens = this.estimateTokens(compressed);
    return ((originalTokens - compressedTokens) / originalTokens) * 100;
  }

  /**
   * Estimate token count (rough approximation)
   */
  private estimateTokens(text: string): number {
    return Math.ceil(text.split(/\s+/).length * 1.3);
  }

  /**
   * Escape special regex characters
   */
  private escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Get all symbols by category
   */
  getSymbolsByCategory(category: string): SymbolMapping[] {
    return SYNTHLANG_SYMBOLS.filter(s => s.category === category);
  }

  /**
   * Get all categories
   */
  getCategories(): string[] {
    return [...new Set(SYNTHLANG_SYMBOLS.map(s => s.category))];
  }

  /**
   * Analyze prompt and suggest symbols
   */
  suggestSymbols(prompt: string): SymbolMapping[] {
    const suggestions: SymbolMapping[] = [];
    const lowerPrompt = prompt.toLowerCase();

    for (const symbol of SYNTHLANG_SYMBOLS) {
      const patterns = [
        symbol.concept.toLowerCase(),
        ...symbol.description.toLowerCase().split(', '),
      ];

      if (patterns.some(p => lowerPrompt.includes(p))) {
        suggestions.push(symbol);
      }
    }

    return suggestions;
  }

  /**
   * Extract which symbols were actually used in the compressed text
   */
  extractUsedSymbols(original: string, compressed: string): Array<{symbol: string, concept: string, originalWords: string[]}> {
    const used: Array<{symbol: string, concept: string, originalWords: string[]}> = [];
    const lowerOriginal = original.toLowerCase();
    
    // Find all Kanji symbols in the compressed text
    const kanjiRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g;
    const kanjiInCompressed = compressed.match(kanjiRegex) || [];
    const uniqueKanji = [...new Set(kanjiInCompressed)];
    
    // For each unique Kanji, find what it replaced
    for (const kanji of uniqueKanji) {
      const symbolMapping = this.symbolMap.get(kanji);
      if (symbolMapping) {
        // Find which words from the description were in the original
        const matchedWords: string[] = [];
        const descriptionWords = symbolMapping.description.toLowerCase().split(', ');
        
        for (const word of descriptionWords) {
          const wordPattern = new RegExp(`\\b${this.escapeRegex(word)}(s|es|ed|ing)?\\b`, 'i');
          if (wordPattern.test(lowerOriginal)) {
            matchedWords.push(word);
          }
        }
        
        if (matchedWords.length > 0) {
          used.push({
            symbol: kanji,
            concept: symbolMapping.concept,
            originalWords: matchedWords
          });
        }
      }
    }
    
    return used;
  }
}
