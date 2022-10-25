import { Grid, TextField } from '@mui/material'
import React from 'react'
import { Controller, } from 'react-hook-form'

export default function FormInput({required,name,label,control,fullWidth}) {
    return (
        <Grid item xs={12} sm={6}>
            {/* <Controller
            control={control}
            render={() => (
                <TextField
                name={name}
                fullWidth 
                variant='standard'
                label={label}
                required
                defaultValue=""
                />
            )} */}
            
            <Controller
        name={name} 
        rules={{ required: true }}
        control={control}
        render={({ field }) => <TextField {...field} required={required} fullWidth={fullWidth} variant="standard"  label={label}/>}
      />
            
        </Grid>
    )
}
