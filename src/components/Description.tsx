import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutAnimation,
} from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

interface DescriptionProps {
  desc: string;
}

const Description = ({ desc }: DescriptionProps) => {
  const [viewMore, setViewMore] = useState(true);

  const toggleView = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setViewMore(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoTitle}>Description</Text>

      <TouchableWithoutFeedback onPress={toggleView}>
        <View>
          <Text
            numberOfLines={viewMore ? 3 : undefined}
            style={styles.descriptionText}
          >
            {desc}
          </Text>

          <Text style={styles.toggleText}>
            {viewMore ? 'View More' : 'View Less'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  container: {
    padding: SPACING.space_20,
  },
  infoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  descriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  toggleText: {
    marginTop: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryOrangeHex,
  },
});
