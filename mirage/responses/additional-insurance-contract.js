import Mirage from 'ember-cli-mirage';

export const additionalInsuranceContractHTML = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <style type="text/css">
    a {text-decoration: none}
  </style>
</head>
<body text="#000000" link="#000000" alink="#000000" vlink="#000000">
</body>
</html>
`;

export default function() {
  const headers = {
    'Content-Type': 'text/html;charset=UTF-8',
  };

  return new Mirage.Response(200, headers, additionalInsuranceContractHTML);
}
