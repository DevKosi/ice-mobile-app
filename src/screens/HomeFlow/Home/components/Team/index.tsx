// SPDX-License-Identifier: ice License 1.0

import {ActivityIndicator} from '@components/ActivityIndicator';
import {SectionHeader} from '@components/SectionHeader';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {MainTabsParamList} from '@navigation/Main';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {
  TeamMember,
  TeamMemberSkeleton,
} from '@screens/HomeFlow/Home/components/Team/components/TeamMember';
import {useRtlOnLayoutReady} from '@screens/HomeFlow/Home/components/Team/hooks/useRtlOnLayoutReady';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {isRTL, t} from '@translations/i18n';
import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {isAndroid, rem} from 'rn-units';

type Props = {
  showEmptyTeamView?: boolean;
};

export const Team = memo(({showEmptyTeamView}: Props) => {
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabsParamList>>();

  const {
    fetch,
    data: referrals,
    loadNext,
    hasNext,
    loadNextLoading,
  } = useFetchCollection(
    useMemo(
      () => ({
        selector: referralsSelector({referralType: 'T1'}),
        action: ReferralsActions.GET_REFERRALS({referralType: 'T1'})('T1'),
      }),
      [],
    ),
  );

  useEffect(() => {
    fetch({isInitial: true});
  }, [fetch]);

  const onViewTeamPress = useCallback(
    () => navigation.navigate('TeamTab'),
    [navigation],
  );

  const {onLayout, flatListRef} = useRtlOnLayoutReady();
  const renderItem: ListRenderItem<string | null> = useCallback(
    ({item, index}) => {
      return (
        <View
          key={index}
          // ItemSeparatorComponent doesn't work with RTL in expected manner.
          // So have to use a wrapper with a margin.
          style={index < referrals.length - 1 ? styles.separator : null}
          onLayout={onLayout}>
          {item ? <TeamMember userId={item} /> : <TeamMemberSkeleton />}
        </View>
      );
    },
    [onLayout, referrals.length],
  );

  if (referrals.length < 2 && !hasNext) {
    return showEmptyTeamView ? <View style={styles.emptyTeamView} /> : null;
  }

  return (
    <>
      <SectionHeader
        title={t('home.team.title')}
        action={t('home.team.view_team')}
        onActionPress={onViewTeamPress}
      />
      <FlatList
        horizontal
        ref={flatListRef}
        data={referrals.length ? referrals : Array<null>(6).fill(null)}
        renderItem={renderItem}
        ListFooterComponent={
          loadNextLoading ? (
            <ActivityIndicator style={styles.activityIndicator} />
          ) : null
        }
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.memberContent}
        onEndReached={loadNext}
        inverted={isRTL && isAndroid}
      />
    </>
  );
});

const styles = StyleSheet.create({
  separator: {
    marginEnd: rem(19),
  },
  memberContent: {
    marginTop: rem(18),
    paddingHorizontal: SCREEN_SIDE_OFFSET + rem(4),
    alignItems: 'center', // for activity indicator
    flexGrow: 1,
    flexDirection: isRTL && isAndroid ? 'row-reverse' : 'row',
  },
  activityIndicator: {
    marginLeft: rem(10),
  },
  emptyTeamView: {
    paddingTop: rem(12),
  },
});
