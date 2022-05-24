import { Button } from "@mui/material";
import md5 from "md5";
import React from "react";

interface Props {
  reference: string;
  amount: string | number;
  email: string;
  description: string;
  idUser: any;
  idCase: any;
}

const PayUForm: React.FC<Props> = ({
  reference,
  amount,
  email,
  description,
  idUser,
  idCase,
}) => {
  const merchanId = "508029";
  const apiKey = "4Vj8eK4rloUd272L48hsrarnUA";
  const signature = md5(`${apiKey}~${merchanId}~${reference}~${amount}~COP`);
  return (
    <form
      style={{ width: "100%" }}
      method="post"
      className="w-full"
      action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/"
    >
      <input name="merchantId" type="hidden" value={merchanId} />
      <input name="accountId" type="hidden" value="512321" />
      <input name="description" type="hidden" value={description || ""} />
      <input name="referenceCode" type="hidden" value={reference} />
      <input name="amount" type="hidden" value={amount} />
      <input name="currency" type="hidden" value="COP" />
      <input name="signature" type="hidden" value={signature} />
      <input name="test" type="hidden" value="1" />
      <input name="buyerEmail" type="hidden" value={email} />
      <input name="extra1" type="hidden" value={idUser} />
      <input name="extra2" type="hidden" value={idCase} />
      <input name="responseUrl" type="hidden" value="http://localhost:3001/" />
      <input
        name="confirmationUrl"
        type="hidden"
        value="http://localhost:3001/"
      />
      <Button variant="contained" type="submit" sx={{ px: 2 }} fullWidth>
        Comprar
      </Button>
    </form>
  );
};

export default PayUForm;
