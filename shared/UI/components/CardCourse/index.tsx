import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Box } from "@mui/material";
import { useRouter } from "next/router";

export default function CardCourse({
  descripcion,
  precio,
  nombre,
  capitulos,
  uid,
  image,
}: any) {
  const router = useRouter();
  return (
    <Card sx={{ width: 345 }}>
      <CardActionArea onClick={() => router.push(`/detail/${uid}`)}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {descripcion}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography>{capitulos?.length} capitulos</Typography>
            <Typography>$ {precio}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => router.push(`/detail/${uid}`)}
        >
          Ver detalle
        </Button>
      </CardActions>
    </Card>
  );
}
