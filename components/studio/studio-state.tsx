import Feather from '@expo/vector-icons/Feather';
import type { ComponentProps } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { colors, opacity, space } from '@/theme/tokens';

type FeatherName = ComponentProps<typeof Feather>['name'];

type StudioStateProps = {
  icon: FeatherName;
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
  isBusy?: boolean;
};

export function StudioState({
  icon,
  title,
  body,
  actionLabel,
  onAction,
  isBusy = false,
}: StudioStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconArea} accessibilityElementsHidden>
        {isBusy ? (
          <ActivityIndicator size="large" color={colors.contentPrimary} />
        ) : (
          <Feather name={icon} size={92} color={colors.contentPrimary} strokeWidth={1.25} />
        )}
      </View>

      <View style={styles.copy}>
        <AppText variant="sectionTitle">{title}</AppText>
        <AppText variant="body" style={styles.body}>
          {body}
        </AppText>
      </View>

      {actionLabel && onAction ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          disabled={isBusy}
          onPress={onAction}
          style={({ pressed }) => [
            styles.action,
            pressed && styles.pressed,
            isBusy && styles.disabled,
          ]}>
          {isBusy ? (
            <ActivityIndicator size="small" color={colors.contentInverse} />
          ) : (
            <Feather name="image" size={22} color={colors.contentInverse} />
          )}
          <AppText variant="buttonLabel" tone="inverse">
            {actionLabel}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: space.lg,
    paddingBottom: space.xxl,
    justifyContent: 'center',
  },
  iconArea: {
    minHeight: 156,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    gap: space.md,
  },
  body: {
    maxWidth: 620,
  },
  action: {
    minHeight: 54,
    marginTop: space.xxl,
    paddingHorizontal: space.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.md,
    borderRadius: 28,
    backgroundColor: colors.contentPrimary,
  },
  pressed: {
    opacity: opacity.pressed,
  },
  disabled: {
    opacity: 0.75,
  },
});
