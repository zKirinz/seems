import { useState } from 'react'

import { useRecoilValue } from 'recoil'

import { Box, Avatar, FormControl, OutlinedInput } from '@mui/material'

import atom from '../../../../recoil/auth'

const ResponseComments = ({ openResponseCommentField }) => {
    const auth = useRecoilValue(atom)
    const [responseComments, setResponseComment] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasMoreComments, setHasMoreComments] = useState(false)
    const [loadMoreCommentsConfig, setLoadMoreCommentsConfig] = useState({
        numberComments: 4,
        lastCommentId: null,
    })
    return (
        <Box sx={{ mt: 1 }}>
            {openResponseCommentField && (
                <Box sx={{ display: 'flex', width: '94%', ml: 'auto' }}>
                    <Avatar alt="avatar" src={auth.image} />
                    <FormControl fullWidth sx={{ ml: 2 }}>
                        <OutlinedInput
                            placeholder="Write your comment..."
                            size="small"
                            sx={{
                                borderRadius: 8,
                            }}
                            autoFocus
                        />
                    </FormControl>
                </Box>
            )}
        </Box>
    )
}

export default ResponseComments
