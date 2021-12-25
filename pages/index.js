import Head from 'next/head';
import Image from 'next/image';
import {
  Container,
  Flex,
  Heading,
  Text,
  Center,
  VStack,
  Button,
  Box,
} from '@chakra-ui/react';

export default function Home() {
  return (
    <VStack>
      <Heading as='h1' py={4}>
        Passport Photo Maker
      </Heading>
      <VStack>
        <Text>
          Photo shops charge around $20 for a set of passport photos!{' '}
        </Text>
        <Text>
          Make your own and print them at a standard photo kiosk for around
          $0.10
        </Text>
      </VStack>

      <Heading size='lg' as='h2'>
        Step 1: Choose a photo
      </Heading>

      <Container maxW={400} bg='gray.100' rounded='md' px={8} py={4}>
        <p>Upload your photo:</p>
        <input type='file' onChange />
        <p>Not ready? Try our test image:</p>
        <Button colorScheme='teal'>
          <Text mx={4}>Demo</Text>
        </Button>
      </Container>

      <Heading size='lg' as='h2'>
        Step 2: Crop and position
      </Heading>

      <Heading size='lg' as='h2'>
        Step 3: Save and print
      </Heading>
      <Text>
        Print this image at your local photo kiosk or pharmacy as a standard
        size photo. A single photo should cost around $0.10
      </Text>
      <Text>
        {`This is standard photo print size in US, Canada, Australia and India.
        This size is also called "10 × 15 cm" (6 x 4 in).`}
      </Text>
    </VStack>
  );
}
