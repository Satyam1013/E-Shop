import React from 'react';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline, IoMdWarning } from 'react-icons/io';

const orders = [
  { id: 44323242, status: 'Pending', date: 'April 18, 2023', total: '₹5000' },
  { id: 23132531, status: 'Shipped', date: 'April 19, 2023', total: '₹10000' },
  { id: 42352314, status: 'Out for Delivery', date: 'April 20, 2023', total: '₹7500' },
  { id: 78421353, status: 'Delivered', date: 'April 21, 2023', total: '₹20000' },
];

const Orders = () => {
  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Orders By User
      </Heading>
      <Stack spacing={4}>
        {orders.map((order) => (
          <Box key={order.id} boxShadow="md" borderRadius="md" p={4}>
            <Flex alignItems="center" justifyContent="space-between" mb={2}>
              <Text fontWeight="semibold">Order of #{order.id}</Text>
              {order.status === 'Delivered' ? (
                <IoMdCheckmarkCircleOutline color="green" size={30} />
              ) : order.status === 'Out for Delivery' ? (
                <IoMdWarning color="orange" size={30} />
              ) : (
                <IoMdCloseCircleOutline color="red" size={30} />
              )}
            </Flex>
            <Text mb={2}>Status: {order.status}</Text>
            <Text mb={2}>Date: {order.date}</Text>
            <Text>Total: {order.total}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Orders;
