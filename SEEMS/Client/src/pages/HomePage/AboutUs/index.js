import React from 'react'

// import Carousel from '../../../components/Carousel'
import { Card, CardContent, Grid, Typography, Paper, Avatar } from '@mui/material'
import { grey } from '@mui/material/colors'

import TitleHomePage from '../TitleHomePage'

const AboutUs = ({ image }) => {
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
            <Grid container columns={{ md: 10, xs: 12 }}>
                <Grid item xs={0} md={6} position="relative" component={Paper} overflow="hidden">
                    <Avatar
                        sx={{ width: '100%', height: '100%' }}
                        src={image.src}
                        alt={image.alt}
                        variant="square"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography fontWeight={700} color="primary.dark" variant="h5">
                                Tại sao chúng tôi xây dựng hệ thống này?
                            </Typography>
                            <Typography paragraph mt={2} sx={{ color: grey[600] }} fontWeight={500}>
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
