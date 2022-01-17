import React from 'react'

import Carousel from '../../../components/Carousel'
import { Card, CardContent, Grid, Typography, Paper } from '@mui/material'

import TitleHomePage from '../TitleHomePage'

const AboutUs = ({ imageList }) => {
    return (
        <React.Fragment>
            <TitleHomePage
                color="primary"
                variant="h4"
                title="About Us"
                mt={5}
                mb={2}
                align="center"
            />
            <Grid container columns={{ md: 10, xs: 12 }} id="about">
                <Grid item xs={0} md={6} position="relative" component={Paper}>
                    <Carousel imageList={imageList} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography
                                component="h1"
                                fontWeight={700}
                                color="primary.dark"
                                variant="h5"
                            >
                                Tại sao chúng tôi xây dựng hệ thống này?
                            </Typography>
                            <Typography
                                component="p"
                                mt={2}
                                sx={{ color: (theme) => theme.palette.grey[600] }}
                                fontWeight={500}
                            >
                                Chúng tôi đã từng có một ý tưởng, 1 suy nghĩ về việc tập hợp một
                                nhóm những người ưu tú với niềm đam mê lớn về lập trình và tổ chức
                                sự kiện, để xem liệu chúng ta có thể tạo ra một thứ gì đó mới để
                                thay đổi thế giới này hay không. Đội ngũ của chúng tôi có một số
                                kinh nghiệm về chuyên môn trong việc tổ chức các sự kiện đặc biệt
                                cho khách hàng cá nhân và doanh nghiệp, chúng tôi đưa ra mô hình,
                                lập kế hoạch và giải quyết từng công việc từ việc tổ chức cho đến
                                lúc bắt tay thực hiện. Tại đây, bạn có thể khám phá và tìm sự kiện
                                mà bạn cần cho bản thân. Hãy tận hưởng trang web của chúng tôi và
                                tìm thứ bạn yêu thích.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default AboutUs
