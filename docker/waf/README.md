# WAF sidecar configuration

`wsc-waf` runs **OpenResty/Nginx + ModSecurity 3 + OWASP CRS**.

- Isolation browsers and gateway proxy must send upstream traffic only to `http://wsc-waf:8080/upstream/{appId}/...`.
- Management publishes rule packs and exclusions; gateway hot-reloads via Redis pub/sub (to be implemented).

Place generated configs in this directory for volume mounts.
