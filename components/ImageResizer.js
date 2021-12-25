import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';

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
  Image as ChakraImage,
} from '@chakra-ui/react';

import { MinusIcon, AddIcon } from '@chakra-ui/icons';

import AvatarEditor from 'react-avatar-editor';
import personOverlay from '../public/person-overlay.svg';

const ImageResizer = ({ sizes, sourceImage, isProcessing, processImage }) => {
  const [scale, setScale] = useState(1.0);
  const editorRef = useRef(null);

  const handleProcessImage = () => {
    const dataUrl = editorRef.current.getImage();
    processImage(dataUrl);
  };

  const handleRangeChange = (value) => {
    setScale(value);
  };

  const changeScale = (delta) => {
    setScale(scale + delta);
  };

  if (!sourceImage) return null;

  return (
    <VStack>
      <Text>Zoom and crop your photo below:</Text>
      <Center>
        <Box position='relative' mx={0} my='auto' width={sizes.picWidth}>
          <AvatarEditor
            image={sourceImage}
            width={sizes.picWidth}
            height={sizes.picHeight}
            border={0}
            ref={editorRef}
            scale={scale}
          />
          <img
            src='/person-overlay.svg'
            alt='overlay'
            style={{
              position: 'absolute',
              width: '100%',
              left: 0,
              top: 0,
              pointerEvents: 'none',
            }}
          />
        </Box>
      </Center>
      <HStack width={sizes.picWidth}>
        <IconButton
          icon={<MinusIcon />}
          onClick={() => {
            changeScale(-0.1);
          }}
        />
        <Slider
          min={0.1}
          max={5}
          step={0.1}
          defaultValue={scale}
          value={scale}
          onChange={handleRangeChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>

        <IconButton
          icon={<AddIcon />}
          onClick={() => {
            changeScale(0.1);
          }}
        />
      </HStack>
      <Button colorScheme='teal' onClick={handleProcessImage}>
        {isProcessing ? 'Processing...' : 'Process'}
      </Button>
    </VStack>
  );
};

export default ImageResizer;
