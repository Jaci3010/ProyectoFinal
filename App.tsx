import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';

// Banco de 100 palabras para NOVATO
const WORDS_NOVATO = [
  'CASA', 'PERRO', 'GATO', 'LIBRO', 'MESA', 'SILLA', 'ARBOL', 'FLOR', 'AGUA', 'FUEGO',
  'TIERRA', 'AIRE', 'SOL', 'LUNA', 'ESTRELLA', 'NUBE', 'LLUVIA', 'VIENTO', 'MAR', 'RIO',
  'MONTANA', 'VALLE', 'CAMPO', 'CIUDAD', 'PUEBLO', 'CALLE', 'PUENTE', 'TORRE', 'IGLESIA', 'ESCUELA',
  'HOSPITAL', 'TIENDA', 'MERCADO', 'PARQUE', 'JARDIN', 'BOSQUE', 'PLAYA', 'DESIERTO', 'SELVA', 'PRADERA',
  'LEON', 'TIGRE', 'OSO', 'LOBO', 'ZORRO', 'CONEJO', 'RATON', 'PAJARO', 'PEZ', 'CABALLO',
  'VACA', 'CERDO', 'OVEJA', 'GALLINA', 'PATO', 'CUERVO', 'AGUILA', 'BUHO', 'LORO', 'CISNE',
  'ROSA', 'TULIPAN', 'LIRIO', 'MARGARITA', 'CLAVEL', 'ORQUIDEA', 'GIRASOL', 'VIOLETA', 'AZUCENA', 'JAZMIN',
  'MANZANA', 'PERA', 'NARANJA', 'PLATANO', 'UVA', 'FRESA', 'MELON', 'SANDIA', 'DURAZNO', 'CIRUELA',
  'COCHE', 'AVION', 'BARCO', 'TREN', 'BICI', 'MOTO', 'CAMION', 'AUTOBUS', 'TAXI', 'COHETE',
  'LAPIZ', 'PAPEL', 'CUADERNO', 'BOLSA', 'RELOJ', 'TELEFONO', 'COMPU', 'TECLADO', 'RATON', 'PANTALLA'
];

const WORDS_AVANZADO = [
  'AVENTURA', 'BATALLA', 'CAMPEON', 'DESAFIO', 'ENERGIA', 'FUERZA', 'GUERRERO', 'HEROE', 'IMPERIO', 'JUSTICIA',
  'KINGDOM', 'LEYENDA', 'MAGIA', 'NACION', 'ORDEN', 'PODER', 'QUEST', 'REINO', 'SABIDURIA', 'TESORO',
  'UNIVERSO', 'VALENTIA', 'WIZARD', 'XILOFONO', 'YOGA', 'ZAFIRO', 'ACTIVO', 'BRAVO', 'CORAJE', 'DESTINO',
  'ESPADA', 'FALCON', 'GUARDIAN', 'HAZANA', 'INGENIO', 'JIRAFA', 'KOALA', 'LEOPARDO', 'MANADA', 'NIEVE',
  'OCEANO', 'PIRATA', 'QUETZAL', 'RAPIDO', 'SERPIENTE', 'TORNADO', 'UNICORNIO', 'VOLCAN', 'WARRIOR', 'XENON',
  'YATE', 'ZORRO', 'ALIANZA', 'BRONCE', 'CRISTAL', 'DRAGON', 'ESCUDO', 'FLECHA', 'GLADIADOR', 'HACHA',
  'ICONO', 'JAGUAR', 'KRAKEN', 'LANZA', 'MISTICO', 'NOBLE', 'ORACULO', 'PALADIN', 'QUIMERA', 'RAYO',
  'TITAN', 'UMBRAL', 'VIKINGO', 'WYVERN', 'XERXES', 'YAKUZA', 'ZENITH', 'ARMADURA', 'BANDERA', 'CETRO',
  'DIAMANTE', 'EMBLEMA', 'FORTALEZA', 'GEMA', 'HONOR', 'INSIGNIA', 'JINETE', 'KHAN', 'LIDER', 'MAESTRO',
  'NINJA', 'OLIMPO', 'PRINCIPE', 'QUEEN', 'REY', 'SAMURAI', 'TRONO', 'UNION', 'VICTORIA', 'ZEUS'
];

const WORDS_EXPERTO = [
  'ABISMO', 'BESTIA', 'CAOS', 'DEMONIO', 'ECLIPSE', 'FENIX', 'GENESIS', 'HECHIZO', 'INFERNO', 'JUICIO',
  'KARMA', 'LEGION', 'MITOLOGIA', 'NEXUS', 'OMEGA', 'PROFECIA', 'QUANTUM', 'RITUAL', 'SANGRE', 'TALISMAN',
  'UMBRA', 'VAMPIRO', 'WARLOCK', 'XENOMORPH', 'YGGDRASIL', 'ZODIACO', 'ABYSS', 'BANSHEE', 'CHIMERA', 'DAEMON',
  'ELIXIR', 'FURY', 'GOLEM', 'HYDRA', 'IMMORTAL', 'JINX', 'KRATOS', 'LICH', 'MEDUSA', 'NECRO',
  'OBLIVION', 'PHOENIX', 'QUASAR', 'RAGNAROK', 'SPECTRE', 'THANATOS', 'URANUS', 'VENOM', 'WRAITH', 'XANADU',
  'YMIR', 'ZOMBIE', 'APEX', 'BLADE', 'CIPHER', 'DOOM', 'ETERNAL', 'FORGE', 'GRYPHON', 'HAVOC',
  'INFERNAL', 'JUGGERNAUT', 'KITSUNE', 'LEVIATHAN', 'MINOTAUR', 'NEBULA', 'ONYX', 'PHANTOM', 'QUAKE', 'RELIC',
  'SHADOW', 'TEMPEST', 'UNDERWORLD', 'VORTEX', 'WARDEN', 'XENO', 'YOKAI', 'ZEALOT', 'ANCIENT', 'BASTION',
  'CRUCIBLE', 'DESTINY', 'ENIGMA', 'FURY', 'GOLIATH', 'HERALD', 'INFUSION', 'JESTER', 'KEEPER', 'LABYRINTH',
  'MYSTIC', 'NIGHTMARE', 'ONSLAUGHT', 'PARADOX', 'QUEST', 'REQUIEM', 'SANCTUM', 'TITAN', 'ULTIMA', 'VALOR'
];

const WORDS_EXTRA = [
  'ACERO', 'BRISA', 'CIELO', 'DANZA', 'ESPEJO', 'FARO', 'GRITO', 'HIELO', 'ISLA', 'JADE',
  'KILO', 'LAGO', 'MURO', 'NIDO', 'ORO', 'PAZ', 'QUESO', 'ROCA', 'SEDA', 'TINTA',
  'UNO', 'VELA', 'WEB', 'XRAY', 'YIN', 'ZEN', 'ALMA', 'BESO', 'CIMA', 'DUNA',
  'ECO', 'FE', 'GEL', 'HOY', 'IRA', 'JOY', 'KEY', 'LUZ', 'MAL', 'NOX',
  'OLA', 'PIE', 'QUE', 'RED', 'SER', 'TIC', 'UVA', 'VER', 'WAR', 'X',
  'YA', 'ZOO', 'ALA', 'BIO', 'CPU', 'DNA', 'EGO', 'FAN', 'GAS', 'HIT',
  'ION', 'JAM', 'KIT', 'LED', 'MIX', 'NET', 'OHM', 'PIN', 'QR', 'RAM',
  'SOS', 'TAO', 'USB', 'VIP', 'WIN', 'XVI', 'YEN', 'ZIP', 'APP', 'BIT',
  'CAR', 'DVD', 'EXE', 'FTP', 'GPS', 'HTML', 'ISO', 'JPG', 'KHZ', 'LAN',
  'MAC', 'NFC', 'OGG', 'PDF', 'QOS', 'ROM', 'SIM', 'TCP', 'URL', 'VGA'
];

const GRID_SIZE = 8;

interface Difficulty {
  name: string;
  words: number;
  time: number;
  color: string;
  headerColor: string;
  gridBgColor: string;
  wordsBgColor: string;
  bank: string[];
}

const generateWordSearch = (words: string[]): string[][] => {
  const grid: string[][] = Array(GRID_SIZE).fill(null).map(() => 
    Array(GRID_SIZE).fill(null).map(() => 
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    )
  );
  
  words.forEach(word => {
    let placed = false;
    let attempts = 0;
    
    while (!placed && attempts < 100) {
      const direction = Math.floor(Math.random() * 3);
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      
      if (canPlaceWord(grid, word, row, col, direction)) {
        placeWord(grid, word, row, col, direction);
        placed = true;
      }
      attempts++;
    }
  });
  
  return grid;
};

const canPlaceWord = (grid: string[][], word: string, row: number, col: number, direction: number): boolean => {
  if (direction === 0 && col + word.length > GRID_SIZE) return false;
  if (direction === 1 && row + word.length > GRID_SIZE) return false;
  if (direction === 2 && (row + word.length > GRID_SIZE || col + word.length > GRID_SIZE)) return false;
  return true;
};

const placeWord = (grid: string[][], word: string, row: number, col: number, direction: number): void => {
  if (direction === 0) {
    for (let i = 0; i < word.length; i++) grid[row][col + i] = word[i];
  } else if (direction === 1) {
    for (let i = 0; i < word.length; i++) grid[row + i][col] = word[i];
  } else {
    for (let i = 0; i < word.length; i++) grid[row + i][col + i] = word[i];
  }
};

const getRandomWords = (wordsBank: string[], count: number): string[] => {
  const shuffled = [...wordsBank].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

interface WordSearchGameProps {
  difficulty: string;
  wordsCount: number;
  timeLimit: number;
  wordsBank: string[];
  headerColor: string;
  gridBgColor: string;
  wordsBgColor: string;
  onBack: () => void;
}

const WordSearchGame: React.FC<WordSearchGameProps> = ({ 
  difficulty, 
  wordsCount, 
  timeLimit, 
  wordsBank,
  headerColor,
  gridBgColor,
  wordsBgColor,
  onBack 
}) => {
  const [words, setWords] = useState<string[]>([]);
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isPlaying, setIsPlaying] = useState(true);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    initGame();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      Alert.alert('¡Perdiste!', 'Se acabó el tiempo', [
        { text: 'OK', onPress: onBack }
      ]);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, isPlaying]);

  useEffect(() => {
    if (foundWords.length === words.length && words.length > 0 && isPlaying) {
      if (difficulty === 'extra') {
        const newRounds = roundsCompleted + 1;
        setRoundsCompleted(newRounds);
        
        if (newRounds >= 5) {
          setIsPlaying(false);
          Alert.alert('¡Felicidades!', '¡Completaste los 5 niveles!', [
            { text: 'OK', onPress: onBack }
          ]);
        } else {
          Alert.alert('¡Nivel completado!', `Nivel ${newRounds} de 5 completado`, [
            { text: 'Siguiente', onPress: () => {
              setTimeLeft(timeLimit);
              initGame();
            }}
          ]);
        }
      } else {
        setIsPlaying(false);
        Alert.alert('¡Ganaste!', '¡Encontraste todas las palabras!', [
          { text: 'OK', onPress: onBack }
        ]);
      }
    }
  }, [foundWords, words]);

  const initGame = () => {
    const selectedWords = getRandomWords(wordsBank, wordsCount);
    setWords(selectedWords);
    setGrid(generateWordSearch(selectedWords));
    setFoundWords([]);
    setSelectedCells([]);
    setIsPlaying(true);
  };

  const handleCellPress = (row: number, col: number) => {
    if (!isPlaying) return;
    
    const cellKey = `${row}-${col}`;
    const newSelected = [...selectedCells];
    
    if (newSelected.includes(cellKey)) {
      setSelectedCells(newSelected.filter(c => c !== cellKey));
    } else {
      newSelected.push(cellKey);
      setSelectedCells(newSelected);
      checkWord(newSelected);
    }
  };

  const checkWord = (cells: string[]) => {
    const word = cells.map(cell => {
      const parts = cell.split('-');
      const row = Number(parts[0]);
      const col = Number(parts[1]);
      return grid[row][col];
    }).join('');
    
    words.forEach(w => {
      if ((word === w || word.split('').reverse().join('') === w) && !foundWords.includes(w)) {
        setFoundWords([...foundWords, w]);
        setSelectedCells([]);
      }
    });
  };

  const isExperto = difficulty === 'experto';

  return (
    <ScrollView style={styles.gameContainer}>
      {/* Header */}
      <View style={[styles.gameHeader, { backgroundColor: headerColor }]}>
        <Text style={styles.gameTitle}>{difficulty.toUpperCase()}</Text>
      </View>

      {/* Timer Bar - Mostrar para todos los niveles excepto en extra que tiene su propio formato */}
      {difficulty !== 'extra' ? (
        <View style={styles.timerBar}>
          <Text style={styles.timerText}>TIEMPO: {timeLeft} SEG</Text>
        </View>
      ) : (
        <View style={styles.timerBar}>
          <Text style={styles.timerText}>TIEMPO RESTANTE: {timeLeft} SEG</Text>
        </View>
      )}

      {/* Main Content */}
      <View style={[styles.gameContent, { backgroundColor: gridBgColor }]}>
        {/* Grid */}
        <View style={styles.gridWrapper}>
          <View style={styles.gridContainer}>
            {grid.map((row, rowIdx) => (
              <View key={rowIdx} style={styles.gridRow}>
                {row.map((cell, colIdx) => (
                  <TouchableOpacity
                    key={`${rowIdx}-${colIdx}`}
                    style={[
                      styles.gridCell,
                      selectedCells.includes(`${rowIdx}-${colIdx}`) && styles.gridCellSelected
                    ]}
                    onPress={() => handleCellPress(rowIdx, colIdx)}
                  >
                    <Text style={styles.gridCellText}>{cell}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Words Section */}
        <View style={styles.wordsSection}>
          <View style={[styles.wordsSectionHeader, { backgroundColor: wordsBgColor }]}>
            <Text style={styles.wordsSectionTitle}>PALABRAS A ENCONTRAR:</Text>
          </View>
          
          <View style={[
            styles.wordsGrid,
            isExperto && styles.wordsGridExperto
          ]}>
            {words.map((word, idx) => (
              <View
                key={idx}
                style={[
                  styles.wordBox,
                  { backgroundColor: foundWords.includes(word) ? '#4CAF50' : wordsBgColor }
                ]}
              >
                <Text style={[
                  styles.wordBoxText,
                  foundWords.includes(word) && styles.wordBoxTextFound
                ]}>
                  {word}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Back Button */}
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: headerColor }]}
          onPress={onBack}
        >
          <Text style={styles.backButtonText}>REGRESAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  const difficulties: Difficulty[] = [
    { 
      name: 'NOVATO', 
      words: 3, 
      time: 45, 
      color: '#FFD700',
      headerColor: '#FFD700',
      gridBgColor: '#FFE87C',
      wordsBgColor: '#FFD700',
      bank: WORDS_NOVATO 
    },
    { 
      name: 'AVANZADO', 
      words: 5, 
      time: 35, 
      color: '#90EE90',
      headerColor: '#90EE90',
      gridBgColor: '#B8F3B8',
      wordsBgColor: '#70C070',
      bank: WORDS_AVANZADO 
    },
    { 
      name: 'EXPERTO', 
      words: 7, 
      time: 30, 
      color: '#FF6B6B',
      headerColor: '#DC4C4C',
      gridBgColor: '#FF9999',
      wordsBgColor: '#DC3545',
      bank: WORDS_EXPERTO 
    },
    { 
      name: 'EXTRA', 
      words: 15, 
      time: 15, 
      color: '#9B59B6',
      headerColor: '#9B59B6',
      gridBgColor: '#C19CD9',
      wordsBgColor: '#8B4AAD',
      bank: WORDS_EXTRA 
    }
  ];

  if (selectedDifficulty) {
    return (
      <WordSearchGame
        difficulty={selectedDifficulty.name.toLowerCase()}
        wordsCount={selectedDifficulty.words}
        timeLimit={selectedDifficulty.time}
        wordsBank={selectedDifficulty.bank}
        headerColor={selectedDifficulty.headerColor}
        gridBgColor={selectedDifficulty.gridBgColor}
        wordsBgColor={selectedDifficulty.wordsBgColor}
        onBack={() => setSelectedDifficulty(null)}
      />
    );
  }

  return (
    <View style={styles.menuContainer}>
      {/* Title Box */}
      <View style={styles.menuTitleBox}>
        <Text style={styles.menuTitle}>SOPITA</Text>
      </View>

      {/* Subtitle Box */}
      <View style={styles.menuSubtitleBox}>
        <Text style={styles.menuSubtitle}>SELECCIONA LA{'\n'}DIFICULTAD DE SOPITA</Text>
      </View>

      {/* Difficulty Buttons */}
      <View style={styles.menuButtonsContainer}>
        {difficulties.map((diff, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.menuButton, { backgroundColor: diff.color }]}
            onPress={() => setSelectedDifficulty(diff)}
            activeOpacity={0.8}
          >
            <Text style={styles.menuButtonText}>{diff.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Menu Styles
  menuContainer: {
    flex: 1,
    backgroundColor: '#64B5F6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  menuTitleBox: {
    backgroundColor: '#1565C0',
    paddingVertical: 25,
    paddingHorizontal: 50,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  menuTitle: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 4,
    textAlign: 'center',
  },
  menuSubtitleBox: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginBottom: 35,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  menuSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  menuButtonsContainer: {
    width: '100%',
    maxWidth: 350,
    gap: 18,
  },
  menuButton: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  menuButtonText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    letterSpacing: 2,
  },

  // Game Styles
  gameContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  gameHeader: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  gameTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 2,
  },
  timerBar: {
    backgroundColor: '#000000ff',
    paddingVertical: 10,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  gameContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  gridWrapper: {
    marginBottom: 25,
  },
  gridContainer: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 8,
    gap: 3,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 3,
  },
  gridCell: {
    width: 38,
    height: 38,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#333',
  },
  gridCellSelected: {
    backgroundColor: '#FFD700',
  },
  gridCellText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  wordsSection: {
    width: '100%',
    maxWidth: 380,
    marginBottom: 25,
  },
  wordsSectionHeader: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  wordsSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  wordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 10,
  },
  wordsGridExperto: {
    justifyContent: 'space-between',
  },
  wordBox: {
    width: '47%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
  },
  wordBoxText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  wordBoxTextFound: {
    textDecorationLine: 'line-through',
  },
  backButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});