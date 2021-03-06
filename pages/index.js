import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { NextSeo } from 'next-seo';
import {
  Container,
  Flex,
  Heading,
  Text,
  Center,
  VStack,
  Button,
  Box,
  HStack,
  Stack,
  Image as ChakraImage,
  IconButton,
  ButtonGroup,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

import loadingMsg from '../utils/loadingMessages';
import ImageResizer from '../components/ImageResizer';
import BMAC from '../components/BMAC';
import * as gtag from '../lib/gtag';

export const SocialMediaLinks = (props) => (
  <ButtonGroup variant='ghost' color='gray.600' {...props}>
    {/* <IconButton
      as='a'
      href='#'
      aria-label='LinkedIn'
      icon={<FaLinkedin fontSize='20px' />}
    /> */}
    <IconButton
      as='a'
      href='https://github.com/dingran/passport-photo'
      aria-label='GitHub'
      icon={<FaGithub fontSize='20px' />}
    />
    {/* <IconButton
      as='a'
      href='#'
      aria-label='Twitter'
      icon={<FaTwitter fontSize='20px' />}
    /> */}
  </ButtonGroup>
);

export default function Home() {
  const [sourceImage, setSourceImage] = useState(null);
  const [photoSingle, setPhotoSingle] = useState(null);
  const [photoSet, setPhotoSet] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sizes, setSizes] = useState({
    picHeight: 600,
    picWidth: 600,
  });

  const fileInputRef = useRef(null);
  const imageResizerRef = useRef(null);

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

  const processImage = (dataUrl) => {
    setIsProcessing(true);
    drawCanvas(dataUrl);
  };

  const drawCanvas = (dataUrl) => {
    setPhotoSingle(dataUrl);
    const canvas = document.createElement('canvas');
    if (!canvas) return console.log('Canvas not supported');

    const img = new Image();

    img.onload = () => {
      canvas.width = sizes.picWidth * 3;
      canvas.height = sizes.picHeight * 2;
      // Note: use the following instead if we keep img's original size in ImageResizer
      // canvas.width = img.width * 3;
      // canvas.height = img.height * 2;

      const ctx = canvas.getContext('2d');
      // Images in grid
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 2; y++) {
          ctx.drawImage(img, (x * canvas.width) / 3, (y * canvas.height) / 2);
        }
      }

      // Draw gridlines
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.moveTo(canvas.width / 3, 0);
      ctx.lineTo(canvas.width / 3, canvas.height);
      ctx.moveTo((2 * canvas.width) / 3, 0);
      ctx.lineTo((2 * canvas.width) / 3, canvas.height);
      ctx.closePath();
      ctx.stroke();

      setIsProcessing(false);
      setPhotoSet(canvas.toDataURL('image/jpg'));

      // TODO: ref.current is null, not sure how to fix this
      // const node = imageResizerRef.current;
      // console.log(node);
      // if (window) window.scrollTo(0, node.scrollHeight + node.offsetHeight);
    };

    img.src = dataUrl;
  };

  return (
    <Container>
      <VStack>
        <NextSeo
          title='Passport Photo Maker'
          description='Photo shops charge around $20 for a set of passport photos! Make your own and print them at a standard photo kiosk for around $0.10'
          canonical='https://passportphoto.dingran.me/'
          //TODO: more SEO stuff?
        />
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

        <Container maxW={sourceImage ? 400 : 250} bg='gray.100' rounded='md'>
          <Flex height='100%' width='100%' gridGap={2} my={4}>
            <VStack
              width={sourceImage ? '60%' : '100%'}
              align='flex-start'
              justify='space-between'
            >
              <VStack alignItems='flex-start'>
                <Text>Use your own photo:</Text>
                <Button
                  colorScheme='teal'
                  onClick={() => {
                    fileInputRef.current.click();
                    gtag.event({
                      action: 'use_own_photo',
                      category: 'Upload',
                    });
                  }}
                >
                  Upload your photo
                </Button>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  onChange={getSourceImage}
                  hidden
                />
              </VStack>
              <VStack alignItems='flex-start'>
                <Text>Not ready? Try a demo photo:</Text>
                <Button
                  colorScheme='teal'
                  variant='outline'
                  onClick={() => {
                    setSourceImage('/demo-photo.jpg');
                    gtag.event({
                      action: 'use_demo_photo',
                      category: 'Upload',
                    });
                  }}
                >
                  Use a demo photo
                </Button>
              </VStack>
            </VStack>
            {sourceImage ? (
              <VStack width='40%'>
                <Text>Preview</Text>
                <ChakraImage
                  src={sourceImage}
                  height='150'
                  alt='Image preview...'
                />
              </VStack>
            ) : (
              <></>
            )}
          </Flex>
        </Container>

        <Heading size='lg' as='h2'>
          Step 2: Crop and position
        </Heading>
        <ImageResizer
          ref={imageResizerRef}
          sizes={sizes}
          isProcessing={isProcessing}
          processImage={processImage}
          sourceImage={sourceImage}
        />

        <Heading size='lg' as='h2'>
          Step 3: Save and print
        </Heading>
        {photoSet ? (
          <>
            <Text>
              Print this image at your local photo kiosk or pharmacy as a
              standard size photo. A single photo should cost around $0.10
            </Text>
            <Text>
              {`This is standard photo print size in US, Canada, Australia and India.
        This size is also called "10 ?? 15 cm" (6 x 4 in).`}
            </Text>
            <Box
              as='a'
              href={photoSet}
              download='passport-photo-set.jpg'
              onClick={() => {
                gtag.event({
                  action: 'download_photoset',
                  category: 'Download',
                });
              }}
            >
              <VStack>
                <img
                  src={photoSet}
                  style={{ width: '100%', maxWidth: 600, margin: 'auto' }}
                />
                <Button leftIcon={<DownloadIcon />} colorScheme='teal'>
                  Download Photo Set
                </Button>
              </VStack>
            </Box>
          </>
        ) : (
          <></>
        )}

        {photoSingle ? (
          <div>
            <p>This is the single cropped image in JPEG format</p>
            <Box
              as='a'
              href={photoSingle}
              download='passport-photo.jpg'
              onClick={() => {
                gtag.event({
                  action: 'download_photosingle',
                  category: 'Download',
                });
              }}
            >
              <VStack>
                <img
                  src={photoSingle}
                  style={{ width: '100%', maxWidth: 300, margin: 'auto' }}
                />
                <Button leftIcon={<DownloadIcon />} colorScheme='teal'>
                  Download Photo Set
                </Button>
              </VStack>
            </Box>
          </div>
        ) : (
          <></>
        )}
        <Center pt={10}>
          <BMAC />
        </Center>

        <SocialMediaLinks />
      </VStack>
    </Container>
  );
}
