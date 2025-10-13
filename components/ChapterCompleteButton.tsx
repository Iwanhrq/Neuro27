import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ChapterCompleteButtonProps {
  chapterId: string;
  isCompleted: boolean;
  onComplete: (chapterId: string) => void;
  onUncomplete?: (chapterId: string) => void;
}

export default function ChapterCompleteButton({ 
  chapterId, 
  isCompleted, 
  onComplete,
  onUncomplete 
}: ChapterCompleteButtonProps) {
  if (isCompleted) {
    return (
      <TouchableOpacity 
        style={styles.completedContainer} 
        onPress={() => onUncomplete?.(chapterId)}
      >
        <Text style={styles.completedText}>✓ Concluído</Text>
        <Text style={styles.tapToUncompleteText}>Toque para desmarcar</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={styles.completeButton} 
      onPress={() => onComplete(chapterId)}
    >
      <Text style={styles.completeButtonText}>Marcar como concluído</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  completeButton: {
    backgroundColor: colors.brand,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.brand,
    alignSelf: 'center',
    shadowColor: colors.brand,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  completeButtonText: {
    fontSize: 16,
    fontFamily: fontFamily.semibold,
    color: colors.textOnDark,
    textAlign: 'center',
  },
  completedContainer: {
    backgroundColor: colors.accentPurple,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'center',
    shadowColor: colors.accentPurple,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  completedText: {
    fontSize: 16,
    fontFamily: fontFamily.semibold,
    color: colors.textOnDark,
    textAlign: 'center',
  },
  tapToUncompleteText: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.textOnDark,
    textAlign: 'center',
    opacity: 0.8,
    marginTop: 2,
  },
});
