import {FormControl, Icon, Input} from 'native-base';
import React, {FC} from 'react';
import {Platform, TextInputProps} from 'react-native';

type Props = TextInputProps & {
  error?: string;
  isInvalid?: boolean;
  isRequired: boolean;
  helperText?: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon?: any;
  iconName?: string;
};

export const FormInput: FC<Props> = ({
  error,
  isInvalid = false,
  isRequired = false,
  helperText,
  onChangeText,
  placeholder,
  icon,
  iconName,
  ...restProps
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} mb={5}>
      <Input
        {...restProps}
        placeholder={placeholder}
        variant="filled"
        colorScheme={'secondary'}
        py={Platform.OS === 'ios' ? 4 : 2}
        bg={'gray.200'}
        borderRadius={10}
        onChangeText={onChangeText}
        InputLeftElement={
          <Icon as={icon} name={iconName} size={5} ml="2" color="black" />
        }
      />
      {helperText ? (
        <FormControl.HelperText>{helperText}</FormControl.HelperText>
      ) : null}
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  );
};
