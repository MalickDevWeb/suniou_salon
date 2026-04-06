# Frontend Git Workflow

## Branches permanentes

- `main`: version stable et publiable
- `develop`: integration des nouvelles fonctionnalites avant validation

## Branches temporaires

- `feature/frontend-navigation-shell`
- `feature/frontend-auth-ui`
- `feature/frontend-home-nearby-salons`
- `feature/frontend-salon-details`
- `feature/frontend-booking-flow`
- `feature/frontend-shop-and-cart`
- `feature/frontend-orders-history`
- `feature/frontend-profile`
- `feature/frontend-state-and-api`
- `feature/frontend-offline-cache`
- `feature/frontend-ui-system`
- `hotfix/frontend-<short-description>`
- `release/frontend-vX.Y.Z`

## Regles

- Ne jamais pousser du travail direct sur `main`
- Utiliser `develop` comme branche d'integration
- Une fonctionnalite = une branche `feature/...`
- Une correction urgente = une branche `hotfix/...`
- Une mise en production preparee = une branche `release/...`

## Flux normal

```bash
git switch develop
git pull origin develop
git switch -c feature/frontend-auth-ui
```

Travail, puis:

```bash
git add .
git commit -m "feat: add frontend auth ui"
git push -u origin feature/frontend-auth-ui
```

Ensuite:

- Pull request `feature/frontend-auth-ui` -> `develop`
- Validation fonctionnelle
- Merge dans `develop`

## Release

Quand `develop` est pret:

```bash
git switch develop
git pull origin develop
git switch -c release/frontend-v1.0.0
git push -u origin release/frontend-v1.0.0
```

Ensuite:

- Pull request `release/frontend-v1.0.0` -> `main`
- Tag apres merge sur `main`
- Retour de sync vers `develop`

## Hotfix

```bash
git switch main
git pull origin main
git switch -c hotfix/frontend-login-crash
```

Puis:

- Pull request `hotfix/frontend-login-crash` -> `main`
- Reporter le correctif dans `develop`

## Convention de commits

- `feat: ...`
- `fix: ...`
- `refactor: ...`
- `test: ...`
- `docs: ...`
- `chore: ...`
