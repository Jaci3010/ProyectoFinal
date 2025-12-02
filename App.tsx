import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';

// Interfaz para el tipo de dificultad
interface Difficulty {
  name: string;
  words: number;
  time: number;
  color: string;
  bank: string[];
}

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

// Banco de 100 palabras para AVANZADO
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

// Banco de 100 palabras para EXPERTO
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

// Banco de 100 palabras para EXTRA
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

const GRID_SIZE = 6;

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
  onBack: () => void;
}

const WordSearchGame: React.FC<WordSearchGameProps> = ({ 
  difficulty, 
  wordsCount, 
  timeLimit, 
  wordsBank, 
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{difficulty.toUpperCase()}</Text>
        <Text style={styles.timer}>Tiempo: {timeLeft}s</Text>
        {difficulty === 'extra' && (
          <Text style={styles.rounds}>Ronda: {roundsCompleted + 1}/5</Text>
        )}
      </View>

      <View style={styles.wordsContainer}>
        <Text style={styles.wordsTitle}>Palabras a encontrar:</Text>
        <View style={styles.wordsList}>
          {words.map((word, idx) => (
            <Text 
              key={idx} 
              style={[
                styles.word,
                foundWords.includes(word) && styles.wordFound
              ]}
            >
              {word}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.gridContainer}>
        {grid.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.row}>
            {row.map((cell, colIdx) => (
              <TouchableOpacity
                key={`${rowIdx}-${colIdx}`}
                style={[
                  styles.cell,
                  selectedCells.includes(`${rowIdx}-${colIdx}`) && styles.cellSelected
                ]}
                onPress={() => handleCellPress(rowIdx, colIdx)}
              >
                <Text style={styles.cellText}>{cell}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>REGRESAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  const difficulties: Difficulty[] = [
    { name: 'NOVATO', words: 4, time: 30, color: '#FFD700', bank: WORDS_NOVATO },
    { name: 'AVANZADO', words: 6, time: 25, color: '#90EE90', bank: WORDS_AVANZADO },
    { name: 'EXPERTO', words: 9, time: 20, color: '#FF6B6B', bank: WORDS_EXPERTO },
    { name: 'EXTRA', words: 3, time: 10, color: '#9B59B6', bank: WORDS_EXTRA }
  ];

  if (selectedDifficulty) {
    return (
      <WordSearchGame
        difficulty={selectedDifficulty.name.toLowerCase()}
        wordsCount={selectedDifficulty.words}
        timeLimit={selectedDifficulty.time}
        wordsBank={selectedDifficulty.bank}
        onBack={() => setSelectedDifficulty(null)}
      />
    );
  }

  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuTitle}>SOPITA</Text>
      <Text style={styles.menuSubtitle}>Selecciona la dificultad:</Text>
      
      {difficulties.map((diff, idx) => (
        <TouchableOpacity
          key={idx}
          style={[styles.menuButton, { backgroundColor: diff.color }]}
          onPress={() => setSelectedDifficulty(diff)}
        >
          <Text style={styles.menuButtonText}>{diff.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  timer: {
    fontSize: 20,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  rounds: {
    fontSize: 18,
    color: '#9B59B6',
    fontWeight: 'bold',
    marginTop: 5,
  },
  wordsContainer: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  wordsTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  wordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  word: {
    color: '#fff',
    fontSize: 14,
    padding: 5,
    backgroundColor: '#444',
    borderRadius: 5,
  },
  wordFound: {
    backgroundColor: '#28a745',
    textDecorationLine: 'line-through',
  },
  gridContainer: {
    alignSelf: 'center',
    backgroundColor: '#2a2a2a',
    padding: 5,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 30,
    height: 30,
    backgroundColor: '#444',
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cellSelected: {
    backgroundColor: '#FFD700',
  },
  cellText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  menuTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  menuSubtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 30,
  },
  menuButton: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  menuButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});