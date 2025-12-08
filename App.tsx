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
  'OCEANO', 'PIRATA', 'QUETZAL', 'RAPIDO', 'SERPIENTE', 'TORNADO', 'UNICO', 'VOLCAN', 'WARRIOR', 'XENON',
  'YATE', 'ZORRO', 'ALIANZA', 'BRONCE', 'CRISTAL', 'DRAGON', 'ESCUDO', 'FLECHA', 'GALAN', 'HACHA',
  'ICONO', 'JAGUAR', 'KRAKEN', 'LANZA', 'MISTICO', 'NOBLE', 'ORACULO', 'PALADIN', 'QUIMERA', 'RAYO',
  'TITAN', 'UMBRAL', 'VIKINGO', 'WYVERN', 'XERXES', 'YAKUZA', 'ZENITH', 'ARMADURA', 'BANDERA', 'CETRO',
  'DIEZ', 'EMBLEMA', 'FORTALEZA', 'GEMA', 'HONOR', 'JINETE', 'KHAN', 'LIDER', 'MAESTRO',
  'NINJA', 'OLIMPO', 'PRINCIPE', 'QUEEN', 'REY', 'SAMURAI', 'TRONO', 'UNION', 'VICTORIA', 'ZEUS'
];
const WORDS_EXPERTO = [
  'ABISMO', 'BESTIA', 'CAOS', 'DEMONIO', 'ECLIPSE', 'FENIX', 'GENESIS', 'HECHIZO', 'INFERNO', 'JUICIO',
  'KARMA', 'LEGION', 'MITOLOGIA', 'PORTAL', 'OMEGA', 'PROFECIA', 'MISTERIO', 'RITUAL', 'SANGRE', 'TALISMAN',
  'SOMBRA', 'VAMPIRO', 'BRUJO', 'MONSTRUO', 'ARBOL', 'ZODIACO', 'ABISMO', 'ESPECTRO', 'QUIMERA', 'DEMON',
  'ELIXIR', 'FURIA', 'GOLEM', 'HIDRA', 'ETERNAL', 'MALDICION', 'TITAN', 'LICH', 'MEDUSA', 'NECRO',
  'OLVIDO', 'FENIX', 'GUAPO', 'FANTASMA', 'MUERTE', 'URANO', 'VENENO', 'ALMA', 'PALACIO',
  'GIGANTE', 'ZOMBIE', 'APEX', 'ESPADA', 'CIFRA', 'DESTINO', 'FORJA', 'GRIFO', 'CAOS', 'TORMENTA',
  'COLOSAL', 'ZORRO', 'LEVIA', 'MINA', 'NUBE', 'PIEDRA', 'ESPIRITUS', 'TEMBLOR', 'RELIQUIA',
  'SOMBRA', 'TEMPLO', 'MUNDO', 'REMOLINO', 'XENO', 'YOKAI', 'ZELO', 'ANTIGUO', 'FORMA',
  'CRUDO', 'DESTINO', 'ENIGMA', 'FURIA', 'ENERGIA', 'BUFON', 'CUSTODIO', 'CRUDO',
  'MISTICO', 'PESADILLA', 'ATAQUE', 'PAZ', 'BUSQUEDA', 'REQUIEM', 'SANTO', 'TITAN', 'ULTIMA', 'VALOR'
];
const WORDS_EXTRA = [
  'ACERO', 'BRISA', 'CIELO', 'DANZA', 'ESPEJO', 'FARO', 'GRITO', 'HIELO', 'ISLA', 'JADE',
  'KILO', 'LAGO', 'MURO', 'NIDO', 'ORO', 'PAZ', 'QUESO', 'ROCA', 'SEDA', 'TINTA',
  'UNO', 'VELA', 'WEB', 'RAYO', 'YOGA', 'ZENIT', 'ALMA', 'BESO', 'CIMA', 'DUNA',
  'ECO', 'FE', 'GEL', 'HOY', 'IRA', 'JOY', 'KEY', 'LUZ', 'MAL', 'NUBE',
  'OLA', 'PIE', 'QUE', 'RED', 'SER', 'TIC', 'UVA', 'VER', 'MAR', 'XEN',
  'YA', 'ZOO', 'ALA', 'BIO', 'CPU', 'DNA', 'EGO', 'FAN', 'GAS', 'HIT',
  'ION', 'JAM', 'KIT', 'LED', 'MIX', 'NET', 'OHM', 'PIN', 'QR', 'RAM',
  'SOS', 'SOL', 'USB', 'VIP', 'WIN', 'NORTE', 'YEN', 'ZIP', 'APP', 'BIT',
  'CAR', 'DVD', 'EXE', 'FTP', 'GPS', 'HTML', 'ISO', 'JPG', 'MEGA', 'LAN',
  'MAC', 'NFC', 'SON', 'PDF', 'CAL', 'ROM', 'SIM', 'TCP', 'URL', 'VGA'
];

const GRID_SIZE = 10;

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
    Array(GRID_SIZE).fill(null).map(() => '')
  );
  
  words.forEach(word => {
    let placed = false;
    let attempts = 0;
    
    while (!placed && attempts < 200) {
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
  
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === '') {
        grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }
  
  return grid;
};

const canPlaceWord = (grid: string[][], word: string, row: number, col: number, direction: number): boolean => {
  if (direction === 0) {
    if (col + word.length > GRID_SIZE) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row][col + i] !== '') return false;
    }
  } else if (direction === 1) {
    if (row + word.length > GRID_SIZE) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row + i][col] !== '') return false;
    }
  } else if (direction === 2) {
    if (row + word.length > GRID_SIZE || col + word.length > GRID_SIZE) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row + i][col + i] !== '') return false;
    }
  }
  return true;
};

const placeWord = (grid: string[][], word: string, row: number, col: number, direction: number): void => {
  if (direction === 0) {
    for (let i = 0; i < word.length; i++) {
      grid[row][col + i] = word[i];
    }
  } else if (direction === 1) {
    for (let i = 0; i < word.length; i++) {
      grid[row + i][col] = word[i];
    }
  } else if (direction === 2) {
    for (let i = 0; i < word.length; i++) {
      grid[row + i][col + i] = word[i];
    }
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
  const [foundCells, setFoundCells] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isPlaying, setIsPlaying] = useState(true);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const gridRef = useRef<View>(null);
  const scrollViewRef = useRef<ScrollView>(null);

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
    setFoundCells([]);
    setSelectedCells([]);
    setIsPlaying(true);
  };

  const handleTouchStart = (event: any) => {
    if (!isPlaying || !gridRef.current) return;
    
    if (scrollViewRef.current) {
      scrollViewRef.current.setNativeProps({ scrollEnabled: false });
    }
    
    gridRef.current.measure((fx, fy, width, height, px, py) => {
      const touch = event.nativeEvent;
      const relativeX = touch.pageX - px;
      const relativeY = touch.pageY - py;
      const adjustedX = relativeX - 8;
      const adjustedY = relativeY - 8;
      const cellWithGap = 41;
      const col = Math.floor(adjustedX / cellWithGap);
      const row = Math.floor(adjustedY / cellWithGap);
      
      if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
        setIsDragging(true);
        const cellKey = `${row}-${col}`;
        setSelectedCells([cellKey]);
      }
    });
  };

  const handleTouchMove = (event: any) => {
    if (!isPlaying || !isDragging || !gridRef.current) return;
    
    gridRef.current.measure((fx, fy, width, height, px, py) => {
      const touch = event.nativeEvent;
      const relativeX = touch.pageX - px;
      const relativeY = touch.pageY - py;
      const adjustedX = relativeX - 8;
      const adjustedY = relativeY - 8;
      const cellWithGap = 41;
      const col = Math.floor(adjustedX / cellWithGap);
      const row = Math.floor(adjustedY / cellWithGap);
      
      if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
        const cellKey = `${row}-${col}`;
        
        setSelectedCells(prev => {
          if (prev.includes(cellKey)) return prev;
          if (prev.length === 0 || prev.length === 1) return [...prev, cellKey];
          const isValidDirection = validateDirection([...prev, cellKey]);
          if (isValidDirection) return [...prev, cellKey];
          return prev;
        });
      }
    });
  };

  const validateDirection = (cells: string[]): boolean => {
    if (cells.length < 2) return true;
    
    const coords = cells.map(cell => {
      const parts = cell.split('-');
      return { row: Number(parts[0]), col: Number(parts[1]) };
    });
    
    const deltaRow = coords[1].row - coords[0].row;
    const deltaCol = coords[1].col - coords[0].col;
    const dirRow = deltaRow === 0 ? 0 : deltaRow / Math.abs(deltaRow);
    const dirCol = deltaCol === 0 ? 0 : deltaCol / Math.abs(deltaCol);
    
    for (let i = 1; i < coords.length - 1; i++) {
      const currentDeltaRow = coords[i + 1].row - coords[i].row;
      const currentDeltaCol = coords[i + 1].col - coords[i].col;
      const currentDirRow = currentDeltaRow === 0 ? 0 : currentDeltaRow / Math.abs(currentDeltaRow);
      const currentDirCol = currentDeltaCol === 0 ? 0 : currentDeltaCol / Math.abs(currentDeltaCol);
      
      if (currentDirRow !== dirRow || currentDirCol !== dirCol) return false;
      if (Math.abs(currentDeltaRow) > 1 || Math.abs(currentDeltaCol) > 1) return false;
    }
    
    return true;
  };

  const handleTouchEnd = () => {
    if (!isPlaying || !isDragging) return;
    
    if (scrollViewRef.current) {
      scrollViewRef.current.setNativeProps({ scrollEnabled: true });
    }
    
    setIsDragging(false);
    checkWord(selectedCells);
  };

  const checkWord = (cells: string[]) => {
    if (cells.length === 0) {
      setSelectedCells([]);
      return;
    }

    const word = cells.map(cell => {
      const parts = cell.split('-');
      const row = Number(parts[0]);
      const col = Number(parts[1]);
      return grid[row][col];
    }).join('');
    
    words.forEach(w => {
      if ((word === w || word.split('').reverse().join('') === w) && !foundWords.includes(w)) {
        setFoundWords(prev => [...prev, w]);
        setFoundCells(prev => [...prev, ...cells]);
      }
    });
    
    setSelectedCells([]);
  };

  const isExperto = difficulty === 'experto';

  return (
    <View style={styles.gameContainer}>
      <View style={[styles.gameHeader, { backgroundColor: headerColor }]}>
        <Text style={styles.gameTitle}>{difficulty.toUpperCase()}</Text>
      </View>

      <View style={styles.timerBar}>
        <Text style={styles.timerText}>
          {difficulty !== 'extra' ? `TIEMPO: ${timeLeft} SEG` : `TIEMPO RESTANTE: ${timeLeft} SEG`}
        </Text>
      </View>

      <ScrollView 
        ref={scrollViewRef} 
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={[styles.gameContent, { backgroundColor: gridBgColor }]}>
          <View style={styles.gridWrapper}>
            <View 
              ref={gridRef}
              style={styles.gridContainer}
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponder={() => true}
              onResponderGrant={handleTouchStart}
              onResponderMove={handleTouchMove}
              onResponderRelease={handleTouchEnd}
            >
              {grid.map((row, rowIdx) => (
                <View key={rowIdx} style={styles.gridRow}>
                  {row.map((cell, colIdx) => {
                    const cellKey = `${rowIdx}-${colIdx}`;
                    const isSelected = selectedCells.includes(cellKey);
                    const isFound = foundCells.includes(cellKey);
                    
                    return (
                      <View
                        key={cellKey}
                        style={[
                          styles.gridCell,
                          isSelected && { backgroundColor: headerColor },
                          isFound && { backgroundColor: headerColor }
                        ]}
                      >
                        <Text style={styles.gridCellText}>{cell}</Text>
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>

          <View style={styles.wordsSection}>
            <View style={[styles.wordsSectionHeader, { backgroundColor: wordsBgColor }]}>
              <Text style={styles.wordsSectionTitle}>PALABRAS A ENCONTRAR:</Text>
            </View>
            
            <View style={[styles.wordsGrid, isExperto && styles.wordsGridExperto]}>
              {words.map((word, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.wordBox,
                    { backgroundColor: foundWords.includes(word) ? headerColor : wordsBgColor }
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

          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: headerColor }]}
            onPress={onBack}
          >
            <Text style={styles.backButtonText}>REGRESAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  const difficulties: Difficulty[] = [
    { 
      name: 'NOVATO', 
      words: 3, 
      time: 40, 
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
      time: 30, 
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
      <View style={styles.menuTitleBox}>
        <Text style={styles.menuTitle}>SOPITA</Text>
      </View>

      <View style={styles.menuSubtitleBox}>
        <Text style={styles.menuSubtitle}>SELECCIONA LA{'\n'}DIFICULTAD DE SOPITA</Text>
      </View>

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
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  gameContent: {
    flex: 1,
    minHeight: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gridWrapper: {
    marginVertical: 15,
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
  gridCellText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  wordsSection: {
    width: '100%',
    maxWidth: 380,
    marginVertical: 15,
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
    marginTop: 15,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});