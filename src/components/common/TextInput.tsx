import React from 'react';
import {FormControl, Icon, Input, WarningOutlineIcon} from 'native-base';
import {Platform} from 'react-native';

type Props = {
  isRequired?: boolean;
  isInvalid?: boolean;
  placeholder?: string;
  helperText?: string;
  error?: string;
  icon?: any;
  iconName?: string;
  value?: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
};

export const TextInput = ({
  isInvalid = false,
  isRequired = false,
  placeholder,
  helperText,
  error,
  icon,
  iconName,
  value,
  secureTextEntry,
  onChangeText,
  ...restProps
}: Props) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      <Input
        {...restProps}
        InputLeftElement={
          <Icon as={icon} name={iconName} size={5} ml="2" color="black" />
        }
        variant="filled"
        colorScheme={'secondary'}
        py={Platform.OS === 'ios' ? 4 : 2}
        bg={'gray.200'}
        placeholder={placeholder}
        borderRadius={10}
        mb={5}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {helperText ? (
        <FormControl.HelperText>{helperText}</FormControl.HelperText>
      ) : null}
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {error}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
