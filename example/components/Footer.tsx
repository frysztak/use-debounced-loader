import { HStack, Link, Text } from '@chakra-ui/core';
import { Github } from '@emotion-icons/boxicons-logos/Github';
import * as React from 'react';

export function Footer() {
  return (
    <HStack margin={4} justify="space-between">
      <Link href="https://github.com/frysztak/use-debounced-loader">
        <HStack>
          <Github size="24px" />
          <Text>GitHub</Text>
        </HStack>
      </Link>
      <Text fontSize="sm">Sebastian Frysztak, 2020</Text>
    </HStack>
  );
}
