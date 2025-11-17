import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Tag } from "lucide-react";

// --- UPDATED: Mock data with all your products ---
const hardwareProducts = [
  {
    name: "Pro Ducky Pi (Hardware Penetration)",
    image: "/path/to/your/image_646742.jpg", // <-- Your uploaded image
    category: "Hardware",
    rating: 5,
    originalPrice: 3499,
    salePrice: 2860,
    isOutOfStock: false,
  },
  {
    name: "All TDCS Technologies Private Limited Courses",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAB7FBMVEUQBS39/f0QBS4AACYAACQOBi0AAAAAACoAACgAACIQBSsAACMRBS0AAB/3e4akVGtaNUkAAB0AABoPBikAABUJAC3MPZcGACkAAA8OAC/HPJIAABcpDzssETUSBC/Tjxq+VIDWW4ntiGz///wpIzzvhXi5iCY5JSX6siQyISkAAAvuj2Hth3FZVWgAADCqp7PtiWnvlVhhG6IrFkzIxs3lboTre353NbDzn0bxmVHtjWQwHFDx7/IAADTh4OTynUvibIaRWsAkDEpqZnTnpBy5tsDXNZ30ojwnIzyKUL7ren5jJKBxNquHhJIbFDR2c4NLR1pmH2B2Vyf2pzLdYIvQS4mDRbx0K7A6GjpdO4tGLWdwMaiSYME3MkrT0NqsqbWYk59jRhnkpx24jCHWnDePbSMsFimyhylqTik+N1R+XCVSNiagbyv/uBJELh9PSWQAGC85AD+LKHC3PIzRlD2RZTxEHjBxMmGxQ4LViE7KSY9/UTkjACHHU4fHeFBxRUe7cWdGSk+lWG7waIyoYWSzeUlWNDSVQW9RH0nOZYRSKYRJImyLUkKIUVC7gznYfnTye3hzQ6I8GF+4fElOH4NuSJg0EWLckkuDWj5nRpBTGI20bGVyPFBEMmmzZHA8GjTBWXhCFEGmU34qClYhVZgnAAAcIUlEQVR4nO1diX/TRtqWRpIljT2AJQt5alAJCS0YnABxuGoMxPVy+thyBAJxst392LJtl2+7bWF7bPmgLG3othsa6EJZaOk/+r3vSHZ85CIQJ92fnpLKlkejefTOvMdckqQQIUKECBEiRIgQIUKECBEiRIgQIUKECBEiRIgQIUKECBEiRIgQv04QHytdjGWETRH2ShdjGUFclmD6f68MHZYYK2UnxhLMXemivGwQYktcSfJKTUbkS+Wk4ogqu9IlezkAHo5umZWsXEevXKtIlu5S+7+DItcT5UJRbke2UE4ofKULNx88UIqaAOW21vEzGAVKiSepCatQzKHgets55ooFJakSDxPOYkK8GNRjkb9tx7zuS5vaB/v7dd0AqAdZpyygkRFuxNOZgVyH+BqVFUhmkpYBbdLuNCG2ocANAEb/wYOs+wydg7977dW330S8ZtteZwKiM1adm57PEEmOV824MosF6X/nzbfFDd5+9bW3+vXlp9QKx/v91q1bBcE3/1BWOwoIhu/qRF5QWACQIj9QtUyjPQv9f4L839z6/vu/v+x0h5gP6hHjj+//4Z1tPsqOFDAk4K94BOhFxpDeIoFPIT9xJWK51ONgWILMNPXyZf8Gr//p1fd/3691sS0S2v/u1rcP9jsBmn4g3GYpqVSTFyO+1gqbL3ngC3AiNSpEPX+3/+CrW3+ns+45QzSmv/f+WwbtcKSpYyb6hOHr7VSd81MUyWuVviRz66IidXgx9d33XztIu2db7IPKH7f++SAaC/SkiUR93akmy4WsPJthWDyylWNplUC+UCF82Brhyratr+pdVKeaZLy29XWn6VnbFOx62jd8L4pcsZJMKVj1G01ScpFhF8MujbQy9LhuWRmk9wLCawBqAJhJZul8hpFgGFsphsRJmZmB/AvVzXaSaCYzptWwIN1mKLUwdK8M5F+s7c2B3PjVepglGHbTc2utpcf8sOFlylCo4lqpr+7vCoZ8pRiC+5lUg9Dv5SFfspMGb9E0K8aQ2mAu4um+0ssjiR6O6RCvESKvLMN6IaxIUfgmvUusr73BlfmJaoIZrVplVTAknjUgy9WJpWod/5rcQDVuKVK71lwVDCWSAoblePLqwKJiilkYgoVIxw3JFk5SC1YFQyIhwz5HUlLxwvhzWn8RDBfUpMox3u/solpNDNGCuTRi+C7OYliKNMXC/yb53J71amPY/9bb7/3ZYoXsotzUXvC2k+m/fLD+t9E5b7jaGKpvbd16+g/v/TmtVnyS84gyVyspkb988Nf1v/nNb9U5b7jaGOpvbX3z9OnTRz/86OPIsVJtNn69/l+tNJbecO36J5+sX7/+N79V5rzh6mR4FPG3fzOrXOq0IL7hG0ub1zadPXv2k09e+dUx3CoY7jt0aN/+7z/9LFLu6LYBepHPrj3r6en5fDUy1BbSNFtPvykY7tu3f//+Xdv//sVnkepM11tvfqAaiV/76eszZ3p6fBH+yhgqb219G9shMDx0CBgCDtz4IsX+D6NIDIrM9LqbX986jASR4dlfHUOQIVTTo00MD2zfvnPnjXXJZLWUSSQ+vnl4aOgWSLDB0K+lq0iXzs4Q/dJjIma9/Kf3Ptx31G+IWE13bd9+4MDOzTu3fLku9fHNE2vWDA0dBgk2M/zrBx/8PPfgcNcj4NkYSnSGoaPrev/rn97+Yd9RX4Y+wx07tmz5bs+aEydOIMPD9Vr6+Z1rP3uqoswzbtr1XoyFGGISx1AN+o+PfmiSITLcsudEnaEQ4ud3vqKqYcRmGflowqpgSFoZ2hL3IPrX9U+/37V/e50hUNyzp0mGm64BPX+MDq6h7lz1sNsMKdFnkyFrZsiJrUkxL+bo0X/cbpGhzxApbvrKVFxPi8U04nnEjm4Y3KDY3JulOTrAsL+LIqR8VoZxP3pqh2ZYX/x9+4GdLQxBmX792DaCniZCbNvik3v3Tt2NMm2WwUifYRdlyI1vgWHrSUJZCRh2CsDjjqF8s7OZIYhwaC03HBKrX2u7D6b27j2199zUMOvMQjDsZp83dYxvT29rV302V8vU6dQYOB/BPXj5RosMfzqvqNQWMxXgz1aGQYBAcO/ec+cmuQ1RvtQcBQPD091lqOnAkLc+a0LdK5mMN5dOdNR/bt4MBP+1ByiuWWvMjOlS6vK7F0f2Coqnzp07N3WPUamFDuXbTn+oa/Pr25cJqhmzMJRSE4FPM/tF+sffbUaGJ/41tE5tKqzJhk+NjIxc3CtwDjG5wbSb+dD+bUe7zFD59ui2Dp8mPi/DmH0wdmPHlj1bTjzhepO+VEDDgACB4KnJu5OnBMNzx+86anP2DjKcbbbAMoESAxi2d/lRvVoqzW2zYo7N9S9Bhl/qDiFYWArmxHbuXUT5AcHJDYoRH54KKE4NqlojL8/tOkP9e2DYrtXdsUqho6ezBbb++LvH/XX5eURTB6dHUIBA8R7rf+e9bQqbFATh3wUvWu/V5+7lfR8a3aylxPh+X4cMiTUwXy1F8JhSVkn9ydg2v3tyBHXMyN5JT7e/hYDrI93cgGI8fhzEOGoFuRFg+G13ZagAQ9o2EYoks7KcmTsCksQQB/e7e9FEOMOPRkZOnkQtM2wa7xzFkPL0h9t09S6KEHF/g+K3RmD4QzcZEmB4aJvTypCSSE6WJ8zFZQBOzPD0yd0nkeHFSVfd9u3poGfn6EcxFONxHxeIIdng4Np/u23Y3bOHyHB/B0OHYc9uYhHXe5pmOw9O7t59EiX4aJApH9XpYUz54buqeq/OcWo0alMtdvCyzbsbW9zef5m3MVSqwLAWWcTl1HSHp5Hf7t0jFx8w4+MPG/z2HTq6b/+h2zHGLyC/I/Dv/qBpQ5PlXVQ02Nd2e3+7xRduaa+8EEMbfFAT+e3GOjoyOcyc944GBPchsHvu0A9fsPjg1BFfjJcucB2nncS6F+NTz7i9q52h6KaR5fICM5xtz/YePNqNgEZ4Tzff/aGFnuj2ANw+z5TJI0eOH4G/S/ffiHZ3biL1dGB4sI1hMot9hYW5Bx98aJJogUjx7rBhfQ8C3OfTm+GHvXM/fMMsIUaU5KXRjol9ywqw+J0MSTyHDCfi818bs4d3+xJ8NKyzT/eB8I4eahWfILhr+66/g/0fFVK8dPyS1zlJdzlBlRtQS1vPuX057Ksvprz5J6i7AcNpg237vl49D83w2+VjO+Kbz9jGKaR45BLvMkPjxvZtbd2XasafK5om8zO0uU/QUf7dSa8uPx8Htn/3mA1eEgzZshJqh0b1G9svtzFkFX+0TNPmNVsxm4s2OM3ewQ7j9tZX53cAsXPngR2X2UMU4tQClf9lA2XYPmnXV6WyXDXmFSHVXKFJH7DbYPya5NdcO7f7/Hbu3Lzzi6hgeL/bDBWopU6rrBLBOGFFofMJkRJVMJyOfzRX66sLcOfmzTs2r2P3keHDbtdS48cD7TJ08j7DCTY/Q8/0GZr/blOejdYXiG8z9q/ueKpfQoajCxmhlwtq6z/uvNwa47tjwdBZNjkvQ4mwacFQ+XQB8Qls+ewgMrw0Ove41HKAEBUZNp+xjUx96NOcd4yIUPYAreFJ8/VDu/bv2j9r66vT27Llu9SgYMi76HWLUqo/bn7aUktts1SfenCsvau4BVosOiwYcrprXvFtEfjRGhXGItrlJX22+uOOp81EKLXG61MQqvMuMKSebxBPDrMD+2dtfZsb9AA3rbtHhCpdAYYt0RP14o2laZV5nzclNCpUzT3zxv7tuwJ2OKwBpiGQX4Pfnj2PLV+VqrFlJ9UMQpUft1zub2II4bfKfJjOQm3GfiAMovLPXTO180BDfDtm6O3Zc+KyPoUyfGN5CXWAUONLYNhUS21KSLD8gy64qtD3vaf7Lx9o0S7t4sPu/ydsUDRDb/4+vJcOzdafbHna3xRbEEKlYHnEIi4PGmL07zPKpVm7+PRweGPNTdNvhub8Fujlg0af7HnKibYE4OUudmFAQ/xmpxh0m7ENM/QEwRNr1lkYWhz/j0u6vTpPBYb9S76p+Yvv1Xx8YHObcajzOyGGwtd8bXMRHw46XRahFAOG53VFXwocDKCENh1Wb7TREwRP+MAxxsdsFEV4f1FdlC8XypMTj9ctDed1SkzfcYt+0Sm/Jn5DhzeawlaM2jZ3uzrZBGKLm2uWiieUS6bQpicd87sZfk210+c3NLTWegP7aS65tu08Pe90s7+UGjfXrF17c+1S8Ni2Jerrmgf64w56dXZDh4duedEp7DMdVWxKv75pdpnh0FPDVJYAVdVilEd/OYn9pTH1Riu9E2saBA/feiz6oY5fcjTOy0NPlG721FD15tB5/UXuqGBLHJlm25psQ5P8DsO/nxQdTAWI0CTUOX/4J6Obi/epsnbovPMiDJkvxGH2eE299c3QEzhzPiE69qecqBcw7OoM2hdlSG1siSPTEnvSzO9wA2fuxDcc8UVIJRsZKl20+pQaaw+fd+yYBB5/bIH/Zj42wgP4TOxhf9xC33h4zYmhdoJnbj2z+BT2d4MtJJrtbASGdhfjC2B463x/7LndtQDwzeamP7x2jz1tr56ITUz1B582uDFJI8Bwk9LNEVJPWXtmnfHcHqkWiwlBwhdCbMMfIR021n3dRg8IbjDvisG1UdUD4RP1/OFN3ZwxFKPGV7c2bWDq0qHYnHqPRk5eHLnomesOD7XwO7NpozoqRkgvMB6TFJXZz27d6eZabklz9WdQjhfAHeZRdfiiGOQejP/89dCZw7fq/M480817x5HhfYdKJHqnZ9OZW5s0rYu9UbGYJqmPN/UsDmfg3632k89Mz/ai90DXXBw5Ncw+2zRUJ9jTc8dU/LkKUxtAbBp7dqZn0x3b1byuBhhav+5uXCTKd3qetZ+LGY3pQiMjp+7FjTsBvZ7Pr1nqpJiLMTWIvQXE8c5vNAyuad3sqtHQYmiauyg4dFPPRsNpPal5MYl6VLmLQhzZ+8CwvtqE/HqgCfJglsIgQ92i2bbuatT2ujjI/ZwwrvXcUaXZ3QPqPrgoJkVNDsf1az2fX7+mWvemjuO0qKnh7nbkvwCM62e/0qXZq5hnq/f2AkGoqXcdK3aeMW+yPq+tu2MxLwDjq7OfG1pMm1WIxIu5oFHFzMupe0pcvxtMTpwaVLs5uWTpiGmEXT97bfYtkAhOnvU0e3h6REwP3ntq8tQ5f4LphW562S8GTf/57PU5pmsRjW6MQUVtTBFGYBs83uWZFy8EGgURGrOrGU/zrl+HymhT996pOkMQIjTBVb15JHgD6IUSv+HRjZ984hEamw3I8BNQQp5HmT+THXkev8sVLdbdYYrnQ1A6z/OQqPrB+mumbc/uixvKtU8+UBScsu+5w1NChBeGo6tagBIGDjoOYeD2Tp7n/PzK+g3z4ZX1PztEdyEiBgdn6tTkYHT176WokeuvNGH9+lfmg/j5rxugVnu24nA3as+5nmHVQNOur38uvLIeGIpL22cdr1LEND8AVBRVCWLBuaNE8aeovyLjIKGmEeNsoCuDQytoB2J0gcWHXYOGMxRs5ri2NlM8fxfP5m/1XeTaIU7O9pvDHd6aks6meCF7zVZNZprLVpdxu84HD6YfPBhu6tYTO9L5HSgBV3seLPBzHYG5BMCh6XlwZ/QhYMNyUYTi/fJoenp693S08wm7wQEiP7dxLggFg/NgQuCTszDcqEBrc7UhC/ONSw8vPLw0ulwbLUMt+WVaUeLT08OLxOAg/Bv0Py0Sb8yHDQ/vJ9TEw2WbH4UMH0Edmg7m+HbgYjtOzY5zQYQULI3pxJEOXApwn2lsWRkOT7smezAd7Ffq8AWwYH3U3eBDv4ML3PV6H4fuGoahG2ITX/xT8KjrbHTKMq2H/1nOWrr70aNHJ3+J+6pR8hUHaD5UfrPokBklO9f5OjQaqEs6p1GBGyqjl+7fv7+c7VAiw79Ao+L+N6FQZ8xDZww452+kBdgdPvORzAHwlainiea4rNaT2oubMrNcEHV45W4fIkSIEM8N0d1Cg90N4A+MBZ4C9xrVtYdzYaknxoN85dpQshR/Ir4rLvlWxhP2jPi/EiK6Sv3tnoXzgO8YICSGP1GMQPwcxX3hdyIuEVtO168j/osJJI+KTAldwuxMbiYR6UQyxXXx0dJjtsjNjacjkWSUeJKSiETS/nLkmJIMYHE9nUrjpwhOBXcsSJ0wPU9NJ8VzY+mERIx0UkfWRiKBz5BEk5ATczwoMktb9SfDVbyByj1k6DlM3JeTVNJCj8NIJKN+EeJLmdlnlrIBxuPVGh4HqimxBbVanqjl8tkMo9ErxXyuNlFWcZ1IppGe+emz2dqYSy0KqXPFjKpmalkLHpBSqBVTBnwZUylRMrWiQSQX3xABOUkMF2rWJuJiub7kpvzTNsPtIlWlBDllK8waz45bHoU71jLxKhQhO+HNv1BnVsQHGjurJQvBpyIun2TVYDfEiXg1mJ1/1bUJK82kry9MkKtGPFNPnYBc0rjHS0nORRT4UksQYlbkvEocFkwSz1VNnBKfTYoiONHgvR+5TJx40bFgy7dipCLLBZMnajO3ys2ya8xCUDKlEuQ0AP+PQzal0gSUohZ1zDHIb6JQKcpjyaKcK1Qr+Rp14HlfKZVKOXkc0jNIX6ggynrVT52FsiNDaJBRYJiO4kObSHoMGDKeyOJe7IUJSHvFSCBDrHReOjidA+b9GodHNVAoFOWMHqnJtZQBWVyFT/kMFCFrPD9DT4+aEVnOJJhqZuScw+JpyHLCgieXG0upilVWzbxcihimWnaxQBB1sLxcSMdNBRhGIIQ1TceC1GWmm/GyocPlEddxGTI0RbWoqlFkCIKUS2lmWGM5OZtoMMQ0pYjJIn05kDeclqsJIwr3pTo85UKyJhfT8ZxcieimROdd4zE7cPOYCNYG20aGx1ybJyegbCCUjOWHC2mUYTkRDfSYTd28XFEgBECGlmXFiQtFyTDcaMC1VSiweexYnxcwzBflvC1qaaLWm41wuF+iIveONRiCCLNpDg0QHoPMpZw8kYacJNe2OdTkPNyk7ADNPBTBwJdGPDdAa6MMDc+LAsMy5IFVzkNJCL1PoPw5/z0qYsUhIdwBhswGFSD31vL5fJZBJcyVHV+7Y9PLIeSAoQp1GppU3iyDIKK4ta4TgxsmA4YE5FOybEpsXJ1agHtf0cFyEB01E5wBxpakVEURqskljsahDFWxOhTLSfvxLvA8I/XcomXxlpViXORPOcrQxCYcLPJiZgnkFEwpVOv6Su71GVoghQwwjB8DAgYaP8eETw2G8KWCStTmBD4JkcHZcrXqUgLqSs4TsBHmGG7oKw9YSwupWhl6qB5SmeYF6W4qMQb6rmS2M5TjZYCDK2fre4EgQwtOuvVaqqQH5By2QyMvT6SwhLhnQbVRS5N5eSCJroCBTxabHuQN9SinSIQzELB494ubSFaLuFDnhRm6rgJKJpuM5aCBQ6GVONGIYvD+SFYuJloYIq8I9k14jos10QUjGHeQYRpOxhsMXQP0ENRSBky9KNQ9yCrvCGsB0nJS0Oz7GPHcCLT3CLS4WsKVjGpvDho+t5AhNO+YaXAlUusdsJbKEPcqMYUMeaYGT1jH+jEei6SrxQgFk55OxvPAkAjPSbTDgCEgHVEw9UAsEqmOx5FhBBQU6tIkfMlH7WhV7u0FGUJ7zlcjkTJWBwtlaHHOPU6hJmbgNGjREsMKVCxHIlfkHBSJp4Ahk5xyLdsXSZdFm3wxGdYXbSU8mkQznMdtTK7iB9wouIqdX4RqyFDx0/s6JaOKBV/5XG/D4ksGWnwob163SRKbE+MMm2gODXrR8qAd9govoZrINE4nuASaHAxyLdebUx1J1FJGRMnyeIuxJUX+JGDIAobZMYtINo9MiALUriTGxE76uQrDhQIoQ9AI8SZNIxeURuqqBTTAVxEyRIufV8Ehx3qpcM+qCn8lV4rwWCJY5gdq3KyfhlpLvWQl539joFITgiG1qn4RMkt8y46SyZThwMsZwFWeNNCHp9zyCqXKlYhD9PSVSqngMDsmaqlGMhnhPYn0iD4a81OPJXWnL5NRsLWOZTKG1pepOoTaThmO4IEqyauVUkaxOBjVseDiMvjWySrcQGVcDOCYUfCzMgyXlxAHMtcIjSlpvFCNLnVUXFHrR0VRmvwi1fRfQEVc02zeVKieqD4xv5FaeD3Bd00c6z8GR6I0cnLF3fysmk5LuOebaQZv9yJKfeo+pujq265C/Lrg90STYCMMXAuDb+3CuF9s/+/7dhJGvdgVEPNjcXBSMeKHgx+7S56IbzGWF3l54oNE/F51aWWH9SnhfmHEQRCjuIcQsORiMBQ7kEW5bb8Tg2MayrHXAg6QBLWNLX70qEZ9asgdjuK8tKL9z2JtfVQ1Uy53zajKUo7mGi5XFU48g1HHURWHO6qqRKOq6xgmHJjjUeIy3DAQDsAEk0AaU3KoAhcAQG04ClzE4KgaClvRt7ISpw8iiHyxL17B40BZzeQyV8E8Ur2aK5mJYv4YWDRErlQWx/wVhyjVfAE8SrearzBWy49B6FDLQzCYy2T8tJUxcay5BTxMHOt89WDXAKYLHIqsXEuX5GwWnNZIQS44uVoUdxSuYphasapZcHqy2coxOYc9N30OxlYVlaI7XcL+ghJDj6YPYsDCVT8tBEqQa7aogFcOueau6N1eBNzCsBSJjMt9JRncyqwM/nQhMiD3GSyXj1gDuXwtqaQjxRxJsD65GEmnkw61lRmG8UyvnE1ZRQyqKxAepCO1XDzJ4BfwaRMQHRciyQLu6bNCBFsZWgHDeBVi8QLEGPHceEUeU2iqmOvjkDKbKRTKoHl8GUrIEGL6AXksIRflUhIY6ppVg1AbAqRxSEuBYcXk8MTG3JWa6YYMsxNQSxMluTiBfQ7A0EzXckA2AeH9VUceiHuJYu6YI7oDIMqDNiVkGCMqMizJVzC2zfQOpCvIOwUMHcPvwsOKC16uWgLvdoUICoYQQWTH0JnOQ7AOMVEhCl8yuWIqmZVBdeQSHBj2OfgsxqpViIhwE5RKlHogqRKEwOladjwXyWEPYUUVMkSGE5AW+3AqipNEGa5sO2SWoWA7LMrYYViIcgZhbVUN+lIrrM6wGEkmE67PMJmyRGvLypGS3DsQyed9hnUZliKJpCXaISivWnJl22GKi4CoqlSFLoUYHzRHnqE2LR/jvbVkqigLhkKXVl3sicvXsrUC8gBmVyAQBAUjGEp1hqhLs2XUpXk5N6Z3vP6pa3D7cpU4qHKzkq/q1ni+DPZQBS0JJtHJFi3XSU7UxhIDtWOO01cTRq7qeoZvIsHqVZTsuGVla0lrIG8W8hBMWsVaGS2lsIdltIe1ifKKtUJJvFgVd1Cljms6Holi97wD3ht4OJ7kMm4TrpqERE0cJTIRzCXo04hPEFbyqA7Wg3H4kbvwm4Q+jkS0KARJpuJgwgRb2ciIcDGEQsUwGuEasTk6l1yMfEE0S8AFlRyCHqc/w8Z/mTWC4G+Y0NPgcg5ncbKJx0WuOBXHi0mQHt8wvLIU/SFB4R+jN90YbvSdaxqEHchfwtmNVKu70sEVUvAKMoprE5q87OBsMAQZIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRYnXg/wHrVYJC7RhhEQAAAABJRU5ErkJggg==",
    category: "Combo",
    rating: 0,
    originalPrice: 5624,
    salePrice: 4499,
    isOutOfStock: false,
  },
  {
    name: "AtomS3U(Rubber-Duck-Kit)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbselltZRTKqlWg620s_Rq_HE2tgyUSIj7Pg&s",
    category: "Hardware",
    rating: 0,
    originalPrice: 2999,
    salePrice: 2499,
    isOutOfStock: false,
  },
  {
    name: "BW16-5Ghz Kit(Pre-Installed Firmware)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkDg98A3ww8C_jg8f_KU91KY9kn2MRyqZoLQ&s",
    category: "Hardware",
    rating: 5.00,
    originalPrice: 1999,
    salePrice: 1499,
    isOutOfStock: false,
  },
  {
    name: "CYBER-T USB-ARMY-KNIFE(Pre-Installed Firmware)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzRhZ8FEcQAMMyx2ONJqm65DAUk8ufX-5WZw&s",
    category: "Hardware",
    rating: 5.00,
    originalPrice: 3499,
    salePrice: 2860,
    isOutOfStock: false,
  },
  {
    name: "CYD-ESP32(Marauder) Cyber Edition",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ALPJCxwCPh2-ApQTWan19yyVgLShdVxwXQ&s",
    category: "Hardware",
    rating: 5.00,
    originalPrice: 3999,
    salePrice: 2999,
    isOutOfStock: false,
  },
  {
    name: "ESP32/2NRF Kit(Bluetooth Penetration)",
    image: "https://images.pexels.com/photos/4481258/pexels-photo-4481258.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Hardware",
    rating: 4.50,
    originalPrice: 2499,
    salePrice: 1799,
    isOutOfStock: true,
  },
  {
    name: "ESP8266-Kit(Pre-Installed WiFi Firmware)",
    image: "https://images.pexels.com/photos/3575189/pexels-photo-3575189.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Hardware",
    rating: 0,
    originalPrice: 999,
    salePrice: 599,
    isOutOfStock: false,
  },
  {
    name: "EvilTeam (RedTeamer Choice)",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Courses",
    rating: 4.50,
    originalPrice: 2000,
    salePrice: 1099,
    isOutOfStock: false,
  },
  {
    name: "F-OSINT (Final Open Source Intelligence)",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Courses",
    rating: 4.75,
    originalPrice: 2000,
    salePrice: 1049,
    isOutOfStock: false,
  },
  {
    name: "Start Android (Beginner Level)",
    image: "https://images.pexels.com/photos/147413/fuchs-fox-animal-sly-147413.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Courses",
    rating: 0,
    originalPrice: 1500,
    salePrice: 299,
    isOutOfStock: false,
  },
  {
    name: "Mr.Hacker Bug Bounty Course (Website Penetration)",
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Courses",
    rating: 0,
    originalPrice: 1500,
    salePrice: 699,
    isOutOfStock: false,
  },
];

// Helper to format currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Helper to render rating stars
const RatingStars = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);
  if (rating === 0) return <div className="h-5"></div>; // Keep space
  
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < filledStars
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">({rating.toFixed(2)})</span>
    </div>
  );
};

// New Product Card Component
const ProductCard = ({ product }: { product: (typeof hardwareProducts)[0] }) => {
  return (
    <Card className="overflow-hidden shadow-lg group relative">
      <CardHeader className="p-0">
        <div className="relative h-56">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <Tag className="h-3 w-3" />
            <span>SALE</span>
          </div>
          {product.isOutOfStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <span className="text-xs font-semibold text-primary uppercase">{product.category}</span>
        <CardTitle className="text-lg h-14 line-clamp-2">{product.name}</CardTitle>
        <RatingStars rating={product.rating} />
        <div className="pt-2">
          <span className="text-xl font-bold text-red-600">{formatPrice(product.salePrice)}</span>
          <span className="ml-2 text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
        </div>
      </CardContent>
    </Card>
  );
};


// The Main Page Component, rebuilt as a store
const HardwareServices = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-background via-background to-primary/5 relative">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold gradient-text mb-3">Hardware Store</h1>
          <p className="text-muted-foreground text-lg">
            Shop our professional lineup of cybersecurity hardware and tools.
          </p>
        </motion.div>

        {/* This div wraps the entire store layout to be blurred */}
        <div className="relative pointer-events-none">
          {/* Sidebar is on the left */}
          <div className="flex flex-col lg:flex-row gap-8"> 
            
            {/* Sidebar Filters (Left) */}
            <aside className="lg:w-1/4 space-y-6">
              <Card>
                <CardHeader><CardTitle>Filter by Price</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <Slider defaultValue={[0, 5000]} max={10000} step={100} disabled />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Min: {formatPrice(0)}</span>
                    <span>Max: {formatPrice(5000)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Filter counts */}
              <Card>
                <CardHeader><CardTitle>Categories</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-hardware" disabled checked />
                    <label htmlFor="cat-hardware" className="text-sm font-medium leading-none text-muted-foreground">
                      Hardware (13)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-courses" disabled />
                    <label htmlFor="cat-courses" className="text-sm font-medium leading-none text-muted-foreground">
                      Courses (7)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-combo" disabled />
                    <label htmlFor="cat-combo" className="text-sm font-medium leading-none text-muted-foreground">
                      Combo (4)
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Deals</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-sale" disabled checked />
                    <label htmlFor="cat-sale" className="text-sm font-medium leading-none text-muted-foreground">
                      On Sale
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Stock Status</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-stock" disabled checked />
                    <label htmlFor="cat-stock" className="text-sm font-medium leading-none text-muted-foreground">
                      In Stock
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-out" disabled />
                    <label htmlFor="cat-out" className="text-sm font-medium leading-none text-muted-foreground">
                      Out of Stock
                    </label>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Main Product Grid (Right) */}
            <main className="lg:w-3/4">
              <div className="flex justify-between items-center mb-4">
                {/* Result count text */}
                <span className="text-muted-foreground text-sm">Showing 1–9 of 24 results</span>
                <Select disabled>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Default sorting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default sorting</SelectItem>
                    <SelectItem value="price-low">Sort by price: low to high</SelectItem>
                    <SelectItem value="price-high">Sort by price: high to low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hardwareProducts.map((product, i) => (
                  <ProductCard key={i} product={product} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* "Coming Soon" Overlay with less blur */}
      <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <motion.div
          className="text-center"
          // Pulse/glow animation
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <h2 className="text-6xl font-extrabold text-white" style={{ textShadow: '0 0 25px rgba(255, 255, 255, 0.7)' }}>
            COMING SOON
          </h2>
          {/* --- THIS IS THE FIX --- */}
          <p className="text-2xl text-white/80 mt-2" style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.5)' }}>
            Our new hardware store is launching soon.
          </p>
        </motion.div>
      </div>

    </div>
  );
};

export default HardwareServices;