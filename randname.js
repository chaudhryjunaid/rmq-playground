// Random name generator
// Adapted from: https://github.com/linus/greg

// Generate a Greg sentence
module.exports = ({ num } = {}) => {
  const random = (max) => {
    return Math.floor(Math.random() * max);
  };

  const randomItem = (array) => {
    return array[random(array.length)];
  };

  const count = random(998) + 1;
  const adjective = randomItem(exports.adjectives);
  const noun = randomItem(exports.nouns);

  const randname = [adjective, noun];
  if (num) {
    randname.push(count);
  }
  return randname.join('-').replace(' ', '-');
};

// English adjectives
exports.adjectives = [
  'cute', 'dapper', 'large', 'small', 'long', 'short', 'thick', 'narrow',
  'deep', 'flat', 'whole', 'low', 'high', 'near', 'far', 'fast',
  'quick', 'slow', 'early', 'late', 'bright', 'dark', 'cloudy', 'warm',
  'cool', 'cold', 'windy', 'noisy', 'loud', 'quiet', 'dry', 'clear',
  'hard', 'soft', 'heavy', 'light', 'strong', 'weak', 'tidy', 'clean',
  'dirty', 'empty', 'full', 'close', 'thirsty', 'hungry', 'fat', 'old',
  'fresh', 'dead', 'healthy', 'sweet', 'sour', 'bitter', 'salty', 'good',
  'bad', 'great', 'important', 'useful', 'expensive', 'cheap', 'free', 'difficult',
  'strong', 'weak', 'able', 'free', 'rich', 'afraid', 'brave', 'fine',
  'sad', 'proud', 'comfortable', 'happy', 'clever', 'interesting', 'famous', 'exciting',
  'funny', 'kind', 'polite', 'fair', 'share', 'busy', 'free', 'lazy',
  'lucky', 'careful', 'safe', 'dangerous'
];

// English plural nouns (all animals)
exports.nouns = [
  'rabbits', 'badgers', 'foxes', 'chickens', 'bats', 'deer', 'snakes', 'hares',
  'hedgehogs', 'platypuses', 'moles', 'mice', 'otters', 'rats', 'squirrels', 'stoats',
  'weasels', 'crows', 'doves', 'ducks', 'geese', 'hawks', 'herons', 'kingfishers',
  'owls', 'peafowl', 'pheasants', 'pigeons', 'robins', 'rooks', 'sparrows', 'starlings',
  'swans', 'ants', 'bees', 'butterflies', 'dragonflies', 'flies', 'moths', 'spiders',
  'pikes', 'salmons', 'trouts', 'frogs', 'newts', 'toads', 'crabs', 'lobsters',
  'clams', 'cockles', 'mussles', 'oysters', 'snails', 'cattle', 'dogs', 'donkeys',
  'goats', 'horses', 'pigs', 'sheep', 'ferrets', 'gerbils', 'guinea pigs', 'parrots',
  'greg'
];

// English verbs, past tense
exports.verbs = [
  'sang', 'played', 'knitted', 'floundered', 'danced', 'played', 'listened', 'ran',
  'talked', 'cuddled', 'sat', 'kissed', 'hugged', 'whimpered', 'hid', 'fought',
  'whispered', 'cried', 'snuggled', 'walked', 'drove', 'loitered', 'whimpered', 'felt',
  'jumped', 'hopped', 'went', 'married', 'engaged'
];

// English adverbs
exports.adverbs = [
  'jovially', 'merrily', 'cordially', 'easily', 'carefully', 'correctly',
  'eagerly', 'easily', 'fast', 'loudly', 'patiently', 'quickly', 'quietly'
];
