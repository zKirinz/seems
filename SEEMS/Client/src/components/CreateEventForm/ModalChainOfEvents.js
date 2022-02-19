import { useState } from 'react'

import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    OutlinedInput,
    Button,
    Modal,
} from '@mui/material'

const ModalChainOfEvents = ({
    chainEvents,
    setChainEvents,
    isOpenModal,
    closeChainOfEventHandler,
}) => {
    const chooseChainOfEventHandler = (event) => {
        setChainEvents(event.target.value)
    }
    const [categoryName, setCategoryName] = useState('')
    const [formCreateNewChainOfEvents, setFormCreateNewChainOfEvents] = useState(false)
    const isValidForm = categoryName.trim().length !== 0
    return (
        <Modal
            open={isOpenModal}
            onClose={closeChainOfEventHandler}
            onBackdropClick={closeChainOfEventHandler}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    minHeight: 200,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <FormControl fullWidth>
                    <InputLabel id="category-chain-events">Category name</InputLabel>
                    <Select
                        labelId="category-chain-events"
                        value={chainEvents ?? ''}
                        label="Category name"
                        onChange={chooseChainOfEventHandler}
                    >
                        <MenuItem value="Java">Java</MenuItem>
                        <MenuItem value="Javascript">Javascript</MenuItem>
                        <MenuItem value="Python">Python</MenuItem>
                    </Select>
                </FormControl>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Do not see suitable chain of events?{'  '}
                    <Typography
                        component="span"
                        variant="h6"
                        fontWeight={700}
                        sx={{ '&:hover': { textDecoration: 'underline' }, cursor: 'pointer' }}
                        color="primary"
                        onClick={() =>
                            setFormCreateNewChainOfEvents((previousValue) => !previousValue)
                        }
                    >
                        Start create one.
                    </Typography>
                </Typography>
                {formCreateNewChainOfEvents && (
                    <Box component="form" sx={{ mt: 2 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel htmlFor="name-chain-events">Name</InputLabel>
                            <OutlinedInput
                                id="name-chain-events"
                                label="Name"
                                size="small"
                                required
                                value={categoryName}
                                onChange={(event) => setCategoryName(event.target.value)}
                            />
                        </FormControl>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" disabled={!isValidForm}>
                                Create
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Modal>
    )
}

export default ModalChainOfEvents
