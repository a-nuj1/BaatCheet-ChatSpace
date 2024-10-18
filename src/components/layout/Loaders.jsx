import { Grid, Skeleton, Stack} from "@mui/material";
import React from "react";

export const LayoutLoader = () => {
  return (
    <Grid container height={"calc(100vh - 4rem)"} spacing={'1rem'}>
      {/* First Section */}
      <Grid
        item
        sm={4}
        md={3}
        sx={{ display: { xs: "none", sm: "block" } }}
        height="100%"
        overflow="hidden"
      >
        <Skeleton variant="rectangular" height={'100vh'} />
      </Grid>

      {/* Second Section (Main Content) */}
      <Grid item xs={12} sm={8} md={6} lg={6} height="100%" overflow="hidden">
        <Stack spacing={'1rem'}>
        {
            Array.from({length: 10}).map((_, i)=>(
                <Skeleton key={i} variant="rounded" height={'5rem'} />
            ))
        }
        </Stack>
      </Grid>

      {/* Third Section */}
      <Grid
        item
        xs={0}
        md={3}
        lg={3}
        height="100%"
        sx={{
          display: { xs: "none", md: "block" },

        }}
        overflow="hidden"
      >
        <Skeleton variant="rectangular" height={'100vh'}/>
      </Grid>
    </Grid>
  );
};
