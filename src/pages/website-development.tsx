import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink, Star } from "lucide-react";

// --- Service Data ---
const services = [
  {
    name: "Website Security",
    slug: "website-security",
    description: "Protect your site from hackers, malware, and data leaks with enterprise-grade monitoring.",
    price: "Starting at 1999",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTult-T4p-9ig7zIoGth7nrWrSHOmtzv_C1gA&s",
  },
  {
    name: "Penetration Testing",
    slug: "penetration-testing",
    description: "Simulate cyberattacks to uncover vulnerabilities before real hackers do.",
    price: "Starting at 2999",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT97UlNaiIwu_wXnTxSEQP1WwGCwcIwOBLXqQ&s",
  },
  {
    name: "Web Development",
    slug: "web-development",
    description: "Custom-built, responsive websites using React, Next.js, or WordPress.",
    price: "Starting at 4999",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4bltNxyXCmTTjBUSrTkHyy5_10dIpwnkvDw&s",
  },
];

// --- Real Projects Showcase ---
const projects = [
  {
    title: "Finexa Banking Portal",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4nWsfrm6LUico5887e1nHr27RY5naM-RN4w&s",
    link: "https://finexa.com",
    desc: "A secure, AI-driven digital banking platform with interactive dashboards and real-time analytics.",
  },
  {
    title: "EduVerse Learning Hub",
    img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGBsYGBgXGBcdGBsYGBYXGBkYGBoeHyggGholHRcYITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lHyUyLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLf/AABEIAJcBTgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgABB//EAEoQAAIBAgQCBwUFBQUGBAcAAAECEQADBBIhMQVBBiJRYXGBkRMyobHBFEJS0fAjYnLh8TNDgpKTFSRjstLjU2TCw0RVc4OUorP/xAAaAQADAQEBAQAAAAAAAAAAAAABAgMABAUG/8QAKBEAAgICAgICAgICAwAAAAAAAAECEQMhEjEEUSJBBRNhoXHxIzKB/9oADAMBAAIRAxEAPwDQtgqpfAId1B8hW0bhFVXeDHsphf2MxQ4RZ/APj+dW/wCyrX4BTTGYfI0Gq1alaKRyy9i1uCWj930J/OqX4BbP4vU08FcRU2VWafsz56O2+1x/i/lVR6Np+N/h+VaJmA5ioknkPXT+dIyi8rKvszNzo32XD6Cs/wAW4c9vchgTG0a19BaeceVZzpMgNsnsYH6fWlOjD5OSU0m9Gat2B3004fwS5dTMjKBMdae7mPGgrQrV9E/7Nx+//wCkVNdnpeTJww8oidui+I/cPgx+q1E9G8RHuDyZfzrdKKtC01Hnrz8q9Hzh+BYgf3TeUH5E0O3Dro3tXB4o35V9QyV77OhQ8fyM12kfKntldxHjpXhFfUzboe5gkO6qfFR+VDiXj+U9x/s+ZFapda+j3ODWv/DTyUCluP6P2yhygK2sHX5TrW4lF+Sg+0YrGdZUj7q5T453YR5MPQ0NZsmnN3gr2Qz3GVl7EBB1gDeRAOvrQ2GILqBm1IG4+gqjojjyznG0urI28GaJ+wsAdV0E7if691MsfZAUHfWNZ/ImqbaTpAj+E/WmjG1ZyZPyM4ypIAVD2fSi7OCdtQPnTbD2gNAPkPkKMtp3DzpOSEl+QzPqkKbXCGO5o21wZeZPrTONq62wkd1WhXFM5XnzTbuTK7XDba/dFF2rYXUD4VK4aqLTzq6RzJOT7CDdPbVQtieQ0Gv9agBNXKe7lUskfRSNp02cEGbyqN1JIqcdbauujao0PZ4fe/XzrydefhpH51L73lXrDx9aaKAyMd3x+lEWW0qkDWrre1NI0XskTUSakTUSaShrIE15XrV5R4h5H0bMK4kVjj0jtD+8+DcxPZ2V6/SSyN7u2/VbYTPLuPpXTxOXky7pHhAXzA+VKEtxRLcWs3NRdB8m/KqmxVv8Y+NaVsMdHA14zVJLitsQa9dKlIqge2QPU/OpZq5V1NSyVJhKnpB0lT9m3gPgQa0TpSnjVmbbjtU/KgWwupoxlk1peidz+0H8J+YrN2Nqe9GG/asO1PkR+dS+z3vJjeCRp3YxodToPzolTQiI2aYERpqfPSr8p5mnPBLfbDYan9b16M/avoT9RVQgbVYtysY4rc7V/wAp/wCqoszcwKtL6aanlUWburGKXY9nxoVrg1o6aWY5CDNAZCXjV9WtXVB1UCfPUfL4VlMHeGZTI94fOm/F7Ss12QCfZAjuKM0kf5l9KScNG3650/HVnb4uR7j/AJNNj8eotnK0nlAkeu1C2cXJGjHzUUfj0BtkR6UvwMFV05Dbw8K6MUIuLs8fyG1MPBdgRlXUc2ncdkfWrLBMWTpEj/kbeussg1nbSSf51DC3gSiiJVj6Q1IoegWxyK8CQZ5VBb4mBuDr6TVhu8qpjh8diOTTLLh0r1VqHtKkLgq3H2BSpaPXNEqh0I7BQN29V6YwACdPGpzWgwewlres141maDfiiDd1/wAwqB4on4p8JPyqLiy2g8W++uyDvoNL7t7lq638Nq4fjlq9MLiTth73mkfOK3Fh0WlR2V2YVTicJiEy57LKGYICSgGZth71SxGCNv8AtL+HT+K8J9ADTcGwWWZxXntKDzWeeLtH+Bbr/JRU1Fn/AMW+/wDBhLv1NN+tg5FxuivDdFctq2drPEG8LCqP/wBpolLAjTh+Kbva5bU+grcA2LLmFH69K89gv6mmdywD/Sqvs/f+vWmk+xQa3YE0QLYqC26sQ6UthLcOoE0RVFo6/r9cquqUuxivn5VKotuP1+tqmBSWGiJoHHJIpgRQmMXSgOjFcG4ebrm2GAIBOvcQD86a3MG2ERsRIfID1YZZnxFD9HzlxpHaXHwJ+labjGEnD3l3zKeQ+gFPCEWrZ6Hl+Tki1BPTSFzdI7Ja0Ldy22ZoeDJVcjGdD2gDzpkeI2o0b4H8qTprawT9ty18bbL860ptjsFI6OAW3OJJ2nyDflQ2C4wrorFWBI1Cq7AHskCDTIrB8qB6PGLTL+G5cXyzsR8DQ0E9PERyW7/pv+VD8O4u7m4Cjkq+UZEJ6uVSMxJgNqdPCm7tQHA9L19e32b+udP/AECtowv4PxDEOSCucm1aue8qgZw4IHPda94c+Je/ibbIGHVZVN3RBBUgNl1kidBpU+jx61n97Cx/pXf+5RnBX/3272ftF/yrhn/9w03sBk+KcPvLcfNlBlkIDFgB7G24AMDcHs3pbwzAZ2ChjrA21EsF+tbbjig3LokSL68xMNgyunnlrLcFm3dQv1dbZGbTQX7U/Cni2WhCLhJt+h1c4PcS17cuzoImcoBLWy0aaz/OneA6DFlMKigMywXY+6Y+O/nVWOxdr7MLAuqS15djPUFlgzacpitHw7pVhrauGZpYgiEfnathuX4w1VV0ck0uToRdHOiYvIxlBBU9sC5at3ABp+/+t6YcF4CzvdtjEsoUnRAQNLt21yI52fjQ3RnpJbsZwy3CGFkCAu9uwltpkjmtWcK4/wCzusy2i2fPpmg9fEXLq/dI0Fwjes2CmRbg1q3eZHdyM7gkCWOSzauGNT+M9u1MrPC7BAK2sSwIkHKgBHbqKqXEL9qtO4jNdvPkgk5Th7aDlB1T41oOj+IH7SyNkaUnfI2oHkZHpRUhXEWLw1OWCvHxe0vyYUQnDxywJ/xXl+jGtC1wDcgV4Lq9tbkxaRkOjeBw9629y5YUt7a4IbXKFeAu/KnVrh2GHu4e2P8A7a1nujF4hr68mv3iPK6wp9aaFuNOymPEA0ZPZkrM9Y41l0GUEEzltoIAMfh1qZ41c0/av5ZBynSstY4iIBLAGDJhdzJ51aOKR/eEjxQc+6uGbk32fR/oxR6iv/aHGO4y+vWu6yB19Pge+tJw1ycPaJLTkGsSdd9Zr5viuLCCM7kkaS/eeyvpOGYeytH/AIaf8oq2K0tnH53DjGKX9ijpXiQy4S3LHNjLO4j8RI3qzoaiLhcpUZku3FJyrOjnme40Dx9AMRg9P/iFPojmjOjNs/7yuumJufGDXRfxPKSp0OziY2zfAV5cxRnn6/yqHsBzJ9KV9IuIfZ8oCyXDGW0AyvbWI5z7Tt5UiTY9jT247D/mH5VBrumkjz/lXtxbY+98RVFy/ZG9xf8AMv51qYLM9nIOtei7r9Ku9oDuK9NtZ2ogKhdqE1f7NeyvNJ2oNmKrR2omaoNU3r5DRy7Iqc+xkFPt4VYKGttKa9hq8GpjEqHxI0NXk1Xe2rDIwuJuNaxRZdCCCPNaJfjt371yRBEQOY7hQ3HFjEDvUfAn8qpuHSpyk0z6Lx4QyY05JPQThOLsbVi0LDn2dxWmUgqpJEazsRyrQnj13lY8yx/6az+CwVr2BuhFDpcHWAEx7UTrv7rEVrVwaj7oqj2eDJKLaFrcRxB1yW18W/MihcO99SwBQFjnIiYmBprtpTtrAzDQelU3dMRbHJkcealCPmawtoWXGxJ++fJB9RVFjBXi5y33Viup6o6qsf3eRY+taZ1pRbw7NftpmgOl5ToP+EY18TWRmxVc4KTZDG+49krKnKJuBYlSCwYgfCuboXBM3293PoGE/tEV56+uhU+QrsNh3bBXbhu3AVzdUZYkXjuMvn41pLvDXZLbribx9ph70f2PO2l0L/Z7HLrz00IpqroFiNuhNpWKm80gW2jSTmd7ZOpJ0Kp/mpbwjg6XLyW3JhndCQFnqDlINaji3DrgvWCMTePtbTakWZ6uJwxjS3ERcLbbqOUgoOG4dxjSvtXGW+4zRbnWNfdiT4RRtnV40IzbTV/6Zqei3Q/Cl7wZnlHyrrbBIOYx7upheVF8N6O2PtfsmzuP20hnOmQ2im0fddvSlGExTqxuLeuH/eY1FrfIUDaINeue7XaiMHxS4mOYlizGYLAazbQnQAD7vwFUUkcmWEoyf+Rjwvh1sjEDIJFgkEzo63sVbLDsMIm3ZV9ywos3yqKJvYRhAA3+yk+pk+dL+GcWuB7kASRdHu/+Yusefa9V2OL3PZMsCCMOfd5KEj72/Vo2idMbX8N/vuGU7ftf/wCVPbmBZGt3LSyVJVhIEodefYfnWcfitw3UuECbcxFv8S5TP7Sir3Sxl3IE/wDD/wC5QSvoD12PMTi3UZmskD+JPoanYx1w/wByRvEumoHPQ1lcb0ouPabIVJ/+nEd/vnXyqjhHHcQoOZsw5EqCQdNoK6GfhT8dCBvAsNce2SFgribxmeTXWzCmtsEMVOx0INYvi91mCWwxC5rjkarLMxbWCZ3IHZV7dLQkJnLFdCxQNMbGc4J0rVY3WzTWOj+HTa0vov5VaOGWB/dL6n86zOP6WX1RShQ5tibcAR/iOvd3VdhekV9lBJUE9lsEEdvvClcpeylpmhu4C0RHs11Ha351ZcU1ncR0ivKpYEEjttqB/wA3fQ2E6V4hj1sqzMEIDqN9zQdv7MmkM+M2Ge/g1/4zH0svRfDrj4e9iM1q6y3GVgURmE5dfnSW/wAXus9ty+tskr+zXcqVM9bXQ0Q3SK8TJY+SL/1U0aqrJz27RoP9tf8Al8T/AKR/Osz0zxa3XshsPdgK0C5b5tewwkA90j/EBzokdJb342/00/6qW8Y4q7uhZz1RpKIP720/I6+5PlTxqwGib7ONuGv5Ya3Xov2v/l93/wDHt/nSex0guKCqXncZmM+zt65mLcySBrtUz0ivfju/6Vms1/JgYjnXrGo907Vb7I99QT6KUVs1ejTepvYPZ60PiMZaT3rtpfF1rWjUWAzVotUnfpJhgdLwbuRWb5Ch7nS5BAW3ebkOqF/5jSy2Gh+yaRXqms1h+kty6VIshUZzbzFpYMJ+6AB908+yrcX0osWTlZmYzBKqIB5jcT8aXiwOjQk1B6qw2KW4quhlWEg9xqbGgFMxvSdIe2fEehH50C76Cm3S63ordjfAj+lZ+8+lTl2fReBK8KHHDGnCYwDdVZh/p5h8VrWXOKWEVTcu20lQ0MygwQNYJr57gOItbS+ihSbiqvWmNc6nbuJ+FeW7Av2xcYB+oi6tEZbVvqjvJMzVUtHi51/zSS9n0P7WjZSrKw3BBBEeVJOknGDau2SiZyuYkZgJDKVCjQ6yJ8qweLsi1c9kTB6pBB5N2+FaTi2KjI5EZdDPZJYegrV6F4L7ZteDY1cTZS8gIDTodwQSCD5g1n+luIa2EZHKMHIkGDDprB3Hucqp6P8AHLiYeFsiJJSWC6MZk6GN6R8SR8RcPtLgQAwqgzOmYkExoJjbto8adMFBeC4qtrDX8Oc7G8gZIM5WObPJ3AkTPiaG6GY9MJiEuNJt9dSqkGSUZRuQJhjS3FYZ7AzJczdjDfTv25/GltrEEEEco31BI7qrGNoSUkntG1v8Uu4m7aZLjoLVtVt6gZSttM5IBghnTnyy9kVRjcSrXbjBxmdg0AxuonY/qaSNxx3YE5UABACqiwCZ1gDMe8ya5+IPkydU6gh8oz5VBAUNuF1+A7KyxtseGfgviaPCXBYtupJhvZXFAkwy3VJ8NAdfCnV66Hxtq6gLId4GoORwZHpWEwd9zcBnaB3dtXYhbjtna5Ld+bTuE0f112TeS+jf4DEL9oaAxH7UwFJME2WBgeJpA/HHUm0iiAERiQSZSduzePKtV0Awh+zJiLwXIvtDJjRCFXMxaAADbnnvyrKcdu2PtD+wuh0Y5pXZSdxOUTrzHIitGKX0K5XotvYy5eYs7QBso2HlVuY7HURIk99BLi0nqkfvTpr2d/b50XeulrfVjT5U/KheCYet72SN+zJVgTmg5RK7HTtmk74lmB6xC9nL0p1wXFEOu+kaTuOc/GlXGbQtXCFIKFmKRPu5tBr2TWxzTbFnArs411hcxgGVA7T2eNSu4NfaHcCdjvE0Za4fca3KkZmWSp0bLJ0U+EGNN+dLAGlkIg66HQ7aD1prtWjJbpjTG3IthFEBDKmdSCeffqKlguM20ARp23jYyfhrSvADNcUGCSYg89Yihvsua8VXVSxiPwz+VCWNVsZTb6NZxZh7JhmWdDB3IGvltQ3Bb9vLlYgNmkaHSRE9wpYxkkchpXhhRXLy1xL8F2awWhuNRyI2PhXptisXe4pdYBQWCrsonnuTG5orAcYdCA5JXvmfI0/6pJdkXON6NTkFJeJFC5iTGh7PKmF3FqqZydOXae4Ugv3Mp7JO3fRhfZnQVgl/aJyE07xOLt2/eP51nrF1s4A3GuvdrVWJuF2LMJnb9CnasHQh4r0gxF9iJhZjKgYKPLcnxoWxxHEplT2t1VY7BjHfA5UfxbDi3dzQSrme4nWR48/OgcZilVQqiPmJG9C/pI3HVtj48Czf2lx3/idz9aqxuEw2HE5AWiY02HMmNKb4THI4EHU9tIemGDBdGOaG0IHaOZ8iB5UtU9gu+ijC9JbSkZrMd4M/A1q74TLmERuCOysG3DgyEBcrA7nnWiu8RlMluzdYAZdQFEARuxE0rafQ/Brsqwdz/d8QRvbxBceGdWPwY1XxO1DG2xXLoVmSWU6yRsDrQHCrl4piEVbYDTmDsZkrHVgEHaqeMcbzLaWIZLQE882kzziBTcXLo3NR7NN0c4tatOcOTlXdWY6SdSs+dNeLdJMPhzldyWiYUTp47fGvluHuZnJ79ab3bVlmJYzrHP07qEoKKtmTc26H/G+LWcRaJtvJ0OU6Npvpz07KQ3XgSaXcRwbWjIjLow7tY1nxoy3YN1eq2XbcTM9lTlBPa6PS8Xyf1Y5Ra39AlxnOq6CNdP3hHzNEdH7N1nZEYZAASDBg7Aie4H4UNxHhdy0MxOZdp/MUx6Ke0AuMqlgRlERAI1j0PxrZLWJ8DiyZHPLyqhv0Q4YHuXrlwC4faFJYTIAH0I+FAcc4e/tLlpBKZ9SWG24GvcwHlWl6MYU2LUXQAS7XDqDAhewxsKQ9KAFyXW+9mzkToS2ZJjtBPmK48GaUPJv30U4p49l+JFpbORmErlY+TAkDymBVOCu9VfdcgnrEGdTECY2iPKlKYq0yNqG025+FV2mXMTKhSpOUn98GdfA6fvV3xxvi2LPKuSSGfFbqm17NLWsnbUDbXx7PCs8MM2o2HMkGvL18s0RIJ0G2wMR2bk0Xgb3smUrcYq/VOb7pkGNTE6aGOfKqRi0iM5KbJnhYKwpJcbgggeVE4HhwKrnZgdYULyJ01/lRf26BEgk9kT8NqXBmutlF3ICSMsnkdI8e89tLFyfRRxjHdWG43DnS3aQiBLMSJ1PP0oa5hntgMTuY0q/h9gq5RSFg9YnciaaLhpVlZsw5fQ1TJeJ0yUEsq5LQNiekmI+yrhM0Wd8oXU9YmC25E6x4UptEgkbHmCNvEdtHYt1DZBssDwI5+I7aExCsHYsSS0NLTJDag67yNZq3Gop+yC+U3H0E4N4beO80WceZ6ppUtzSpe1pHtl/+ptuDYtCpI98nreGwju2qzF4NbmUk6j+sVleG3yrCP1rWpw7lz1RI+Go+FReno00G2DByg8ufd/WlXSe4PbI2x9mJ/wAzb+VNMHYcMzMABsuonv8ApWc6R4hTfYM8QAIgkbDYgds0sXsHSskrqua4SQQJ07f1r5UDw/iQtXA6sSYiCOVSs3rUQzAg9ob8qd8Jw/D93UMeQBbWN+cVRPVDSdvQB9ttu+dpWYBA0EnfSPE0ytcVtlHS0qnTcg5jz7NNRzNLuMDDe9as5AJABdjJ01MnQDXQUmHEXGk6SJAAAMdseJ9aH672B5fofW75C5sndvVGM6xXkJ1mqrOPjcyOydvAVTfuNc1HLl3UFpml0NsRxJNIPu+7A56TM+EUBfxAZp+H86XhX/CfSuZiphlINVVEtj7IWVWzLsdAPhNDvdy6TQnDsQZI5RV+IuW51IP67qhJyUv4LR4uP8mf6Q8VNxgACFA2Ohk8yOXL0pOtySJNGcVtoG95jPgfDsqjA4RnkgbadldClGkc7g7oJXEsOZoy063UbWLo1LMxIIG+h28uylV+RI5+VV4a4RsY8RPke6aaSUgRbiHDiDR1T4GmVnihdesWLchmgHz5GkLMWM7AAAAdgqFq4amscaoo8krs0OGLkF7i+zTUAZiXY8vBdZkikl/BO4NxCXlsoABLSJmQO8fGmnDr92CEywI3Hbyo1rmIiPaAev51K3BtIrxU0mLbfDClnOxyNqSrDUAaa9ho7C41Cs5VicxJjc+fLahsXYZ1Ie4cukwB20oe+JRUIUBiIgTBgDMeZ5ye2m4ucbYFJY5UifSDGFzA2iT366UX0YKsgDXSpV4KgbrE6+cill9CWzTOu/h9KLt49AAyj9pttoR2N2ij+v40BZPnZrEw4KXFNwuDICnWAdoNZq+yoQlpyqAan7xPM/oUywnF1ZRcuHXkgEaj9dtLxaF0k+7LE6ba8vkfWowhLbLZMkVVF+Cx7Sqy7ZjlEmF22nfl2VpbWFa4hW7lII1A5Dz39BWSFnK9sRoLqA/4jl9Na2918gjnED0rzPLTtOJTGrWz53cwps+1SZyvE9oUSPDRhVz5SVUgGFH0/XnTvG27V1GuZSJLaz70dUExvMCs/fwb2z11Ikcwa9rDm5xXLs4suJx39Fd1QNR3/wAviRXYdoSSJ60esTV/CsMblyJgBSSYmJ2+IqONtez6szDET4P/ACqqaboDVK10EWFAtly/M8tdTpHrQJfWRP1qy4vIbfWakF20OpA7o3Pz+FKoVYXNtIYWsWGQM2jggD95TuPr60bhMYHAy6DmSZPl2Uma7qDE6/MGKIw9+1kmCDz3+VJljaQ+Ke2F4tVZiQYJaO46D6zQ2KtMjZW0Oh7oPMdvlVftxIjbwNHo4uL7M7alT2GOXdVpNuKXojCSU2/YBdAnqnTlO9WYJAWlth8aDaw4PKuDN+E1Gzp12NiwJOXb0/pTbhOLu28xEagDadvPvrKYi6YA27aoRtaDjYJzPoAx11j758AB+U0s4visP98ZrsR1Dpz977u/ZrWa9u+oLtHZJj0o3D8PZxKldDsTB8h2UIw2I5aPBe6sHy8fCisHiiGSI6uYeo51H/Zj5GJKgqNBOp8KrtYFyV6m5I5awMx+AJ8qdsWrDsdn3I03kajU9tLWEamQNxpuNpHmK0VpsluAJAXYDkB2UDxvjyYhLKiwttrK5AVacynWCI0gyd/vGhCfI04KIvsc4amXDxcKl01JMEHsH9aUramCNAfSj8FchcqsdDJInn/StJfZoO3Q9uXbtsj9kGB5g7VTxTClxnIKt2VKxjiIkk/vEmfMECo4vHzHMdgqCbvR0NKtii4hTQ86p9rRGLcsxIHVGwHIUCx1NdUetnLLvRxXDs2di47gNzzMnYeVPcNw7MvVhAdtz5k1jbd0swGp1+FbHC3QVieVc2ZpaOjAm7bEGJ4Deh2EPBOxM+lLHwNxAGZGVTsSNK+gcNaJFGXraOhVlBU8jSx8loeXjLtM+Yqd6jh7ZMxWt6TcGRbavaUKZgjlBrPMFtr393OrrKpK0c7xtOmQXiT2j1QvIMD9KNsdIg5Cm2czQBk62p5RoZ9aAwvC7l4EgAAnVm28uZPhTnB4O1g1NxjmcaZj38lXlPbJPlWnJX/IYRf10UcYuss2yCBodecTz5j8qzy2yzQPeMAeJq/iXFLl957NFUd/zNaDg/CVsobt6MxGx2RSNf8AEfhTOfGOxFBuWgC9bVVVBBCiJHM8z30uW3mBjTUx5GKsxeNUFsoYL92efjXuAXRZ7JPrPzqtpkqosVT2k9k8qvwj1ZejJPM/DlVGGaaKa6GkmkhxhRm3EkEHX1B9RRt1C25P086A4c2/lR4uV5+eKc2dmJtwQtRWsWltwHRZ7jqSdte3try50iK+8C6ndbgB9GHLxo68JGtKMRYpotPsZppBfDuJYWSUQIzRIk6xPfHM1Rxgp7AsyiTqDz6zFt/Olz4RSdVB8qLxd5riwY8R4EfWj92bfGqBYgFogawPiaY47DIgs7ho115lST86qwaIW/auYEQI08yOXdVPSPGhmQKZg7+dWlk+SUSEcdRbkUxDeJB9JmvMgg9x09ab8eRFS26qB1ipgdo/l8aV2CcsdpJ8jt+u+qQkpqyM4uLom1rqg8yR6TReBHXH65VLh2G9o0EkBROnadB9arxtg2w4kHqtB8iNRyrc1fH7GcW0pLoOOCYkAKTO39dq8KWkMXHDNE5LcMezV/dHlNZhVaBqcp8Y/KjGuDOsfhj4mpLH7KSy+griuOzJlVFRSdhqxjtY6+kUCoTLM9Ycq1vRrh1u+GtvoYDTpzpbxngi2nKiCBz2oul0Jt9iIvRWHuXCwCdYnQADXwgVXdRQGKqTynUgdvw+dbfo1cwlpBlYe0YdYvGbXkByHhQbCkeYDglwr+0cKx5ATHjrqajiuB3UBcXgQuZiCI+6RpvrGnZrWgGIQ7MPWquILNth2ik5D6M5g8fALKVzFSBO2uhns5iaX4CzctLc9ohCXLYWTENDKdCOcig8Rba22m3MedEXb5IB12mOyfpTY1uhcjTVguKuknX9CqFukCQede4htarVTBg7cqq0TTGK3iYAc5TRDEKsAyTp399AYPIRqYPZ+VeNigG0BqSjsq5fEPQ8/wBaf1rrlhW1nKe4UIt+Z5a/QVcrV0HOwCxhVtsSHdeyAp8jNM7d6AO6lGFxQOjHXvo9K4si9noY2q0aDBX5g0yRhSDh5y01wjy1c7Raw7imHDWmBMAjfaO+so/BLW4Yu24zwU8CANv1FNOmXECq2kGmbU6xtEfE0kweIDXAr3SFmCygN5gEif1vV8cJcbRzTnHlTGhnKeuF5DKJ8N49IpbfwFg9a6zOf3nIHkARHrTm70T0ze3a6h1BU6d08hUE4DaX7s95plja+wOcRZbx1i3pbUD+Bd/E8/M0l41xB7hjUL2HSfEVsv8AZyDYD0oXE4QbwCRtIB+dGKSdsWUuSpaMPasNcdLaiSfoCT8BRiaZvIR8a0COltxcFpA42KiDroZA0MiaFufZ5LsrCTJ10/pVVkp9E/1WqQrZur+u2rOH4W6bYcJKxMyPzpkuIwv4QfGT8zFXX+LWvZstsiYgARpy5UJZm3UUMsKSuTM1xC+Q1tgxBIacpg6bSBRv+12tojOyvmAMRDDTeRofQUrx1rUMdBO/cAKWX72bwGg8BQlG3bEjJxWjZ4bjtl/vZT2Np8dvjRV0gisYCltQQQ9xu7RR57t+vGNjEXLZgMR3Tp6bUjx+iyy+zTPbE1elukeH4sSYZZ7xofSmeHxqNs2vYdDSuLKKcWe3kqsW5oi4a5FrWzNWQxCs65WJIkHzHfvQty2eRI8KMv3QoJJ25CpcBureuFjAS3DEETm1Oh10Gm2tOpNKycoxb32E8CtxbZiZYnXfQDYfM+dBYi5mFwlgBlO/oNI76s4txAEFbK5VnUgaHw7ahhL1lkdLysxa2cuUhSLgPVkkHq8zvvtVIJ7myc5dRRC1i1OES2fZZgTqCRdALE9aRDDwJ76WWW64nbWpYHCFriAlV11ZiAoA3ma2PE+F4S19kd7eRWdxeKs5DAICuUT1TM7RvTp2TapmWs466jALcaOUmfLWjOIY2665XZTO+gzaCQCeVH8B6Ktdh3JRZkT7xHcOXifStVf6L4Urrb1/FmbMe8mdaR1Yys+c2S6ocp6rDXQa6RXr3myQRpFa270VQHqXGA2gwfjpQGM6PXBbhQGIAGh39YoWHYivXmV9GI05HnHdTTh+KdrqobxRMoLE+XOO00L9hK38rqYy/eB30q+xpiT/AAflW0a6NS/R9bil1xCsoEnQH4hvpSxeElh1W8j8qlYVSwMCe3nR7YgIpJ0AE1Gc3B6Kxipq2ZLitsocraMPlQlhtJ5zNV4zGG7cLHnoB2DkK8UkV0Jt9nO19IKLTqI/XZXDbz+lUh6lZfQinAkSLxHj9KOstpS13kiO0VoLHC2I94fryoKaj2wuDl0Y4HWm/CPaXLi2xGvbyrq6hJKhoN8j6Jgei4yjPcPgoA+c01wnALS82PiR+VdXUqxx9FebFvTTh5TDkrlK6ZgwBOv4Tyr5SmKa20oSORjs7K6up1FVRGb+Q24RxxrbSrFe2OY7CNjW/wCH3ExVsvaEMPeU7eIP0r2upZGj3QDeBFB3jXtdUiiFGI1NCMldXVmOge7hlOsR4VUMNHhXtdTKTQs4JgHHMMSqEb5ssfxf0oG7wW6qF2ygDfXX4V5XVrpCPsFw463lXXN66upxGyywesPP5VeRrXV1M9GH2EtqExLG4R7K44URPUGqjx5b0ofizmBoO2N/WurqnQybDbeDUlWcdQAGBux3kmpcLi7iGAlUYzA7BECurqXFt7GzaWjRdJsWgQWlG0HaKzdlWdgqiS2g/Rrq6rTdRJYuzT8H4JbyXHLhriNkjKSitAOxjNE77UZw7hKqczk3GktqTlDHmq7A9/yrq6oFu2aKy1WO9dXUUYFuGq81dXUDHE0DewNotmyANESNNK6uoWGgDEQjLHM/SiLyB0IOxEGurqnkX2Vx9GDt2znjsPyq7J2V1dXWujlZymoTrXV1EByHUHvFbTDk5RXV1c+fo6MP2f/Z",
    link: "https://eduverse.io",
    desc: "An immersive e-learning platform featuring gamified courses and live instructor sessions.",
  },
  {
    title: "NovaHealth AI Assistant",
    img: "data:image/jpeg;base64,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",
    link: "https://novahealth.ai",
    desc: "AI-powered healthcare app with chatbot integration, scheduling, and telemedicine tools.",
  },
];

// --- Testimonials ---
const testimonials = [
  {
    name: "Emily Carter",
    role: "CEO, Finexa Bank",
    text: "Their security upgrade saved our platform from multiple cyber threats. Reliable, fast, and professional!",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Jason Lee",
    role: "Founder, EduVerse",
    text: "Outstanding design and functionality! The UI/UX exceeded expectations and boosted engagement by 60%.",
    img: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    name: "Ava Johnson",
    role: "CTO, NovaHealth",
    text: "Their AI integration transformed our system. Incredible team that delivers beyond promises.",
    img: "https://randomuser.me/api/portraits/women/57.jpg",
  },
];

// --- FAQs ---
const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most web development projects take between 3 to 6 weeks depending on complexity and revisions.",
  },
  {
    q: "Do you provide ongoing maintenance?",
    a: "Yes, we offer monthly and annual support plans for security, updates, and performance monitoring.",
  },
  {
    q: "Can you migrate my existing website?",
    a: "Absolutely. We handle full migrations with zero downtime and improved performance.",
  },
  {
    q: "What technologies do you use?",
    a: "We specialize in React, Next.js, Tailwind, Node.js, and secure backend APIs.",
  },
];

export default function WebsiteDevelopment() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const navigate = useNavigate();

  return (
    <section ref={ref} className="container mx-auto px-4 py-20 space-y-24 relative">
      {/* --- HERO --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Website Development & Security Services
        </h1>
        <p className="text-muted-foreground text-lg">
          From responsive design to advanced cybersecurity — we build, protect, and optimize your digital presence.
        </p>
      </motion.div>

      {/* --- SERVICES --- */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate(`/services/${service.slug}`)} // 👈 dynamic link
            className="cursor-pointer rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-b from-background to-background/80 hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            <img src={service.image} alt={service.name} className="h-48 w-full object-cover" />
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold">{service.price}</span>
                <Button
                  variant="default"
                  className="gradient-primary"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering card click
                    navigate(`/services/${service.slug}`);
                  }}
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </motion.div>
        ))}
      </div>

      {/* --- PROJECTS --- */}
      <motion.div style={{ y: y1 }} className="space-y-10">
        <h2 className="text-3xl font-bold text-center">🚀 Real Projects We’ve Built</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="rounded-2xl overflow-hidden bg-muted hover:shadow-glow transition-all"
            >
              <img src={p.img} alt={p.title} className="h-48 w-full object-cover" />
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
                <Button
                  onClick={() => window.open(p.link, "_blank")}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  View Project <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* --- TESTIMONIALS --- */}
      <motion.div className="space-y-10">
        <h2 className="text-3xl font-bold text-center">💬 What Our Clients Say</h2>
        <div className="relative overflow-x-auto flex space-x-6 py-6 scrollbar-hide">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              whileHover={{ scale: 1.05 }}
              className="min-w-[300px] bg-gradient-to-b from-background to-muted p-6 rounded-2xl shadow-md hover:shadow-glow"
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold">{t.name}</h4>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <p className="text-sm mb-3">{t.text}</p>
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* --- FAQ SECTION --- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-6">❓ Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
