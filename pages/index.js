import Head from 'next/head';
// import Image from 'next/image';
import {
  Container,
  Flex,
  Heading,
  Text,
  Center,
  VStack,
  Button,
  Box,
  Image,
  HStack,
} from '@chakra-ui/react';
import React, { useState, useRef } from 'react';

import loadingMsg from '../utils/loadingMessages';

export default function Home() {
  const [sourceImage, setSourceImage] = useState(null);
  const [photoSingle, setPhotoSingle] = useState(null);
  const [photoSet, setPhotoSet] = useState(null);

  const getSourceImage = (e) => {
    if (e.target.files.length == 0) {
      //user likely clicked Cancel in file input popup
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSourceImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      new Error('No file detected');
    }
  };

  const fileInput = useRef(null);

  return (
    <VStack>
      <Heading as='h1' py={4}>
        US Passport Photo Maker
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

      <Container maxW={450} bg='gray.100' rounded='md' px={8} py={4}>
        <Center>
          <HStack>
            <VStack alignItems='flex-start' pr={6}>
              <Button
                colorScheme='teal'
                onClick={() => {
                  fileInput.current.click();
                }}
              >
                <Text mx={2}>Upload your photo</Text>
              </Button>
              <input
                ref={fileInput}
                type='file'
                accept='image/*'
                onChange={getSourceImage}
                hidden
              />

              <Text pl={1} pt={4}>
                Not ready? Try a demo photo:
              </Text>
              <Button
                colorScheme='teal'
                variant='outline'
                onClick={() => {
                  setSourceImage('/demo-photo.jpg');
                }}
              >
                <Text mx={2}>Use a demo photo</Text>
              </Button>
            </VStack>

            {/* Note: next/image can't use FileReader data url as src */}
            {sourceImage ? (
              <Image
                src={sourceImage}
                height='150'
                m={4}
                alt='Image preview...'
              />
            ) : (
              <></>
            )}
          </HStack>
        </Center>
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
