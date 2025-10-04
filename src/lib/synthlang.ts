// SynthLang Symbol Mapping
// Inspired by Japanese Kanji - compact symbols for complex concepts

export interface SymbolMapping {
  symbol: string;
  concept: string;
  description: string;
  category: string;
}

export const SYNTHLANG_SYMBOLS: SymbolMapping[] = [
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
   */
  compress(prompt: string): string {
    let compressed = prompt;

    // Sort by description length (longest first) to avoid partial matches
    const sortedSymbols = [...SYNTHLANG_SYMBOLS].sort(
      (a, b) => b.description.length - a.description.length
    );

    // Replace concepts with Kanji symbols
    for (const { symbol, concept, description } of sortedSymbols) {
      // Split description into individual terms
      const terms = description.split(', ').map(t => t.trim());
      
      // Create patterns for each term
      const patterns = [
        concept.toLowerCase(),
        ...terms,
      ];

      for (const pattern of patterns) {
        // More flexible matching - handles variations
        const regex = new RegExp(`\\b${this.escapeRegex(pattern)}(s|es|ed|ing)?\\b`, 'gi');
        compressed = compressed.replace(regex, symbol);
      }
    }

    // Additional aggressive compression rules
    compressed = compressed
      // Remove politeness markers
      .replace(/\bplease\b/gi, '')
      .replace(/\bcould you\b/gi, '')
      .replace(/\bwould you\b/gi, '')
      .replace(/\bi want to\b/gi, '')
      .replace(/\bi need to\b/gi, '')
      .replace(/\bcan you\b/gi, '')
      .replace(/\bwould like to\b/gi, '')
      .replace(/\bi would like\b/gi, '')
      
      // Remove articles
      .replace(/\bthe\b/gi, '')
      .replace(/\ba\b/gi, '')
      .replace(/\ban\b/gi, '')
      
      // Remove auxiliary verbs
      .replace(/\bis\b/gi, '')
      .replace(/\bare\b/gi, '')
      .replace(/\bam\b/gi, '')
      .replace(/\bwas\b/gi, '')
      .replace(/\bwere\b/gi, '')
      .replace(/\bhas\b/gi, '')
      .replace(/\bhave\b/gi, '')
      .replace(/\bhad\b/gi, '')
      
      // Remove common prepositions when context is clear
      .replace(/\bof\b/gi, '')
      .replace(/\bto\b/gi, '→')
      .replace(/\bfrom\b/gi, '←')
      .replace(/\bfor\b/gi, '')
      .replace(/\bin\b/gi, '')
      .replace(/\bon\b/gi, '')
      .replace(/\bat\b/gi, '')
      
      // Collapse multiple spaces
      .replace(/\s+/g, ' ')
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
}
