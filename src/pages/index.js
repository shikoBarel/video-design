import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleLineChart from '../components/SimpleLineChart';
import sampleData from '../data/sampleData.json'; // Replace this with your API call
import VideoWithEffects from '../components/VideoEffects'
import VideoUploader from '../components/VideoUploader'; // Import the new component

const now = new Date();

const Page = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
    const handleFileUpload = async (e) => {

      setIsLoading(true);
      console.log(e);
      const file = e.target.files[0];
      if (!file) return;

      // Step 1: Authenticate and get an API token
      let token;
      let videoId;
      try {
        const authResponse = await axios.post('https://ws.api.video/auth/api-key', {
          apiKey: "8kn11mC7wSnjZavcpdRtaw7p2Wwj1ZdDQyXyRvdUjHI",
        });
        token = authResponse.data.access_token;
      } catch (error) {
        console.error('Error during authentication:', error);
        return;
      }

    // Step 2: Create a video object to get videoId
    try {
      const createVideoResponse = await axios.post(
        'https://ws.api.video/videos',
        { title: "My First Video" },
        {
          auth: {
            username: "8kn11mC7wSnjZavcpdRtaw7p2Wwj1ZdDQyXyRvdUjHI",
            password: ''
          },
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      videoId = createVideoResponse.data.videoId;
    } catch (error) {
      setIsLoading(false);  // Set loading to false if request fails
      console.error('Error creating video object:', error);
      return;
    }

    // Step 3: Upload the actual video file
    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await axios.post(
        `https://ws.api.video/videos/${videoId}/source`,
        formData,
        {
          auth: {
            username: "8kn11mC7wSnjZavcpdRtaw7p2Wwj1ZdDQyXyRvdUjHI",
            password: ''
          },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

        //here need to update the JSON followin API call to python.
        // // Update your state or perform additional tasks
        // const newData = [{ /* new data based on the uploaded video */ }];
        // setData(newData);

        console.log(result);
        setIsVideoUploaded(true);
        setIsLoading(false);
        setVideoUrl(result.data.assets.mp4);
        alert('Video uploaded successfully!');
      } catch (error) {
        console.error('Error uploading video:', error);
      }


  };

  return (
  
    <>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" crossorigin="anonymous"/>

      <Head>
        <title>
          Overview
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
          >
          {isLoading ? (
            <div>
              <img src="loading.gif" alt="Loading..." />  {/* Display the loading GIF */}
            </div>
          ) : (
            <>
              <Container>
                <VideoUploader onUpload={handleFileUpload}/>
              </Container>
              <Container>
              {isVideoUploaded && <VideoWithEffects data={data} setData={setData} originalData={sampleData} videoUrl={videoUrl}/>}
              </Container>
              <Container>
              {isVideoUploaded && <SimpleLineChart data={data} />}
              </Container>
            </>
          )}
            {/* <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: '100%' }}
                value="$24k"
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: '100%' }}
                value="1.6k"
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTasksProgress
                sx={{ height: '100%' }}
                value={75.5}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalProfit
                sx={{ height: '100%' }}
                value="$15k"
              />
            </Grid>
            <Grid
              xs={12}
              lg={8}
            >
                <OverviewSales
                chartSeries={[
                  {
                    name: 'This year',
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                  },
                  {
                    name: 'Last year',
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                  }
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <OverviewTraffic
                chartSeries={[63, 15, 22]}
                labels={['Desktop', 'Tablet', 'Phone']}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <OverviewLatestProducts
                products={[
                  {
                    id: '5ece2c077e39da27658aa8a9',
                    image: '/assets/products/product-1.png',
                    name: 'Healthcare Erbology',
                    updatedAt: subHours(now, 6).getTime()
                  },
                  {
                    id: '5ece2c0d16f70bff2cf86cd8',
                    image: '/assets/products/product-2.png',
                    name: 'Makeup Lancome Rouge',
                    updatedAt: subDays(subHours(now, 8), 2).getTime()
                  },
                  {
                    id: 'b393ce1b09c1254c3a92c827',
                    image: '/assets/products/product-5.png',
                    name: 'Skincare Soja CO',
                    updatedAt: subDays(subHours(now, 1), 1).getTime()
                  },
                  {
                    id: 'a6ede15670da63f49f752c89',
                    image: '/assets/products/product-6.png',
                    name: 'Makeup Lipstick',
                    updatedAt: subDays(subHours(now, 3), 3).getTime()
                  },
                  {
                    id: 'bcad5524fe3a2f8f8620ceda',
                    image: '/assets/products/product-7.png',
                    name: 'Healthcare Ritual',
                    updatedAt: subDays(subHours(now, 5), 6).getTime()
                  }
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={8}
            >
              <OverviewLatestOrders
                orders={[
                  {
                    id: 'f69f88012978187a6c12897f',
                    ref: 'DEV1049',
                    amount: 30.5,
                    customer: {
                      name: 'Ekaterina Tankova'
                    },
                    createdAt: 1555016400000,
                    status: 'pending'
                  },
                  {
                    id: '9eaa1c7dd4433f413c308ce2',
                    ref: 'DEV1048',
                    amount: 25.1,
                    customer: {
                      name: 'Cao Yu'
                    },
                    createdAt: 1555016400000,
                    status: 'delivered'
                  },
                  {
                    id: '01a5230c811bd04996ce7c13',
                    ref: 'DEV1047',
                    amount: 10.99,
                    customer: {
                      name: 'Alexa Richardson'
                    },
                    createdAt: 1554930000000,
                    status: 'refunded'
                  },
                  {
                    id: '1f4e1bd0a87cea23cdb83d18',
                    ref: 'DEV1046',
                    amount: 96.43,
                    customer: {
                      name: 'Anje Keizer'
                    },
                    createdAt: 1554757200000,
                    status: 'pending'
                  },
                  {
                    id: '9f974f239d29ede969367103',
                    ref: 'DEV1045',
                    amount: 32.54,
                    customer: {
                      name: 'Clarke Gillebert'
                    },
                    createdAt: 1554670800000,
                    status: 'delivered'
                  },
                  {
                    id: 'ffc83c1560ec2f66a1c05596',
                    ref: 'DEV1044',
                    amount: 16.76,
                    customer: {
                      name: 'Adam Denisov'
                    },
                    createdAt: 1554670800000,
                    status: 'delivered'
                  }
                ]}
                sx={{ height: '100%' }}
              />
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );


};




Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
