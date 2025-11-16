{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "datever";

  buildInputs = with pkgs; [
    # Markdown linting
    markdownlint-cli

    # Node.js for GitHub Action
    nodejs_20
  ];

  shellHook = ''
    echo "Date-Ver - Date-Based Versioning Specification"
    echo "=============================================="
    echo ""
    echo "Files:"
    echo "  DATE-VER.md - The specification"
    echo "  README.md   - Introduction and examples"
    echo "  .github/actions/validate/ - GitHub Action"
    echo ""
    echo "Commands:"
    echo "  markdownlint-cli DATE-VER.md README.md - Lint markdown files"
    echo "  cd .github/actions/validate && npm install - Install action dependencies"
    echo ""
  '';
}
