// SPDX-License-Identifier: ice License 1.0

import {AuthStackParamList} from '@navigation/Auth';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountActions} from '@store/modules/Account/actions';
import {failedReasonSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {
  emailVerificationCodeSelector,
  temporaryEmailSelector,
} from '@store/modules/Validation/selectors';
import {useCallback, useEffect} from 'react';
import {BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useConfirmEmailCode = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const email = useSelector(temporaryEmailSelector, () => true);
  const code = useSelector(emailVerificationCodeSelector, () => true);

  const validateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.SIGN_IN_EMAIL_CODE),
  );

  const goBack = () => {
    dispatch(AccountActions.SIGN_IN_EMAIL_CODE.RESET.create());
  };

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          dispatch(AccountActions.SIGN_IN_EMAIL_CODE.RESET.create());
          return true;
        },
      );
      return () => subscription.remove();
    }, [dispatch]),
  );

  useEffect(() => {
    if (validateError) {
      navigation.goBack();
    }
  }, [validateError, navigation]);

  return {
    email,
    code,
    validateError,
    goBack,
  };
};
